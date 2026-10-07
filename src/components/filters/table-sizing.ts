import { clampColumnWidth, columnSize, fitColumns, MIN_COLUMN_WIDTH, MAX_COLUMN_WIDTH } from "@/lib/table-columns";

/** An open tip renders inside its header or cell but floats above the table, so it must not size a column:
 * measuring it widened "Phase / status" to its 1,300px explanation on every hover. */
const FLOATING = '[role="tooltip"]';
const inFlow = <E extends Element>(elements: Iterable<E>) => Array.from(elements).filter((el) => !el.closest(FLOATING));
const inFlowText = (cell: Element) => {
  let text = "";
  const walker = document.createTreeWalker(cell, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => node instanceof Element && node.matches(FLOATING) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  for (let node = walker.nextNode(); node; node = walker.nextNode()) if (node.nodeType === Node.TEXT_NODE) text += node.nodeValue;
  return text;
};

/** DOM sizing leaves React's rows, sorting and filtering intact. Manual widths
 * survive row changes; hidden responsive columns take no space in the plan. */
export function installTableSizing(table: HTMLTableElement) {
  const wrapper = table.parentElement!;
  const headers = Array.from(table.tHead!.rows[0].cells);
  const group = table.querySelector("colgroup")!;
  const cols = headers.map(() => group.appendChild(document.createElement("col")));
  const manual = new Map<number, number>();
  const minimums = headers.map(() => MIN_COLUMN_WIDTH);
  const context = document.createElement("canvas").getContext("2d");
  let frame = 0;
  let disposed = false;
  let nearViewport = typeof IntersectionObserver === "undefined";
  let finishDrag: (() => void) | undefined;
  const cleanups: (() => void)[] = [];

  const measure = (cell: HTMLTableCellElement) => {
    const style = getComputedStyle(cell);
    const text = inFlowText(cell).replace(/\s+/g, " ").trim();
    const rendered = style.textTransform === "uppercase" ? text.toUpperCase() : text;
    if (context) context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const spacing = parseFloat(style.letterSpacing) || 0;
    const padding = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
    const width = (s: string) => (context?.measureText(s).width ?? s.length * 8) + Math.max(0, s.length - 1) * spacing + padding;
    // Header icons and resize grip need their own space. Body chips/avatars
    // keep their natural width rather than being estimated as plain text.
    const extras = cell.tagName === "TH" ? inFlow(cell.querySelectorAll("button")).length * 20 + 12 : 0;
    const intrinsic = Math.max(0, ...inFlow(cell.querySelectorAll<HTMLElement>(".chip, svg, img")).map((el) => el.getBoundingClientRect().width + padding));
    const bounded = inFlow(cell.children).map((el) => {
      const min = getComputedStyle(el).minWidth;
      return min.endsWith("px") ? parseFloat(min) + padding : 0;
    });
    const unbreakable = inFlow(cell.querySelectorAll<HTMLElement>(".chip, .whitespace-nowrap")).filter((el) => getComputedStyle(el).whiteSpace === "nowrap")
      .map((el) => el.getBoundingClientRect().width + padding);
    const minimum = Math.max(0, ...bounded, ...unbreakable);
    return { text, width: Math.max(width(rendered) + extras, intrinsic, minimum), token: Math.max(0, ...rendered.split(/\s+/).map(width), intrinsic), minimum };
  };
  const apply = (widths: number[]) => {
    widths.forEach((width, i) => {
      cols[i].style.width = `${width}px`;
      const handle = headers[i].querySelector<HTMLElement>("[data-column-resize]");
      handle?.setAttribute("aria-valuenow", String(Math.round(width)));
    });
    table.style.tableLayout = "fixed";
    table.style.width = `${widths.reduce((a, b) => a + b, 0)}px`;
  };
  const layout = () => {
    frame = 0;
    if (disposed || !nearViewport || finishDrag || wrapper.clientWidth === 0) return;
    const visible = headers.map((cell, i) => ({ cell, i })).filter(({ cell }) => getComputedStyle(cell).display !== "none");
    headers.forEach((cell, i) => { cols[i].style.display = getComputedStyle(cell).display === "none" ? "none" : ""; });
    // A bounded sample avoids blocking the main thread after Show all.
    const rows = Array.from(table.tBodies[0]?.rows ?? []).slice(0, 60);
    const models = visible.map(({ cell, i }) => {
      const head = measure(cell);
      const body = rows.map((row) => row.cells[i]).filter(Boolean).map(measure);
      minimums[i] = Math.ceil(Math.max(MIN_COLUMN_WIDTH, head.minimum, ...body.map((c) => c.minimum)));
      cell.querySelector("[data-column-resize]")?.setAttribute("aria-valuemin", String(minimums[i]));
      return columnSize(body.map((c) => c.text), body.map((c) => c.width), body.map((c) => c.token), head.width, minimums[i]);
    });
    const overrides = new Map<number, number>();
    visible.forEach(({ i }, n) => {
      if (manual.has(i)) {
        const width = Math.max(minimums[i], manual.get(i)!);
        manual.set(i, width);
        overrides.set(n, width);
      }
    });
    const widths = fitColumns(models, wrapper.clientWidth, overrides);
    const all = headers.map(() => 0);
    visible.forEach(({ i }, n) => { all[i] = widths[n]; });
    apply(all);
  };
  const schedule = () => {
    cancelAnimationFrame(frame);
    if (!disposed) frame = requestAnimationFrame(layout);
  };
  headers.forEach((cell, i) => {
    const handle = cell.querySelector<HTMLElement>("[data-column-resize]")!;
    const currentWidths = () => headers.map((head) => getComputedStyle(head).display === "none" ? 0 : head.getBoundingClientRect().width);
    const resize = (widths: number[], width: number) => {
      widths[i] = Math.max(minimums[i], clampColumnWidth(width));
      manual.set(i, widths[i]);
      apply(widths);
    };
    const reset = () => { finishDrag?.(); manual.delete(i); schedule(); };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Home") { event.preventDefault(); reset(); return; }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      event.stopPropagation();
      const rtl = getComputedStyle(table).direction === "rtl" ? -1 : 1;
      const widths = currentWidths();
      resize(widths, widths[i] + (event.key === "ArrowRight" ? 1 : -1) * rtl * (event.shiftKey ? 40 : 10));
    };
    const pointerdown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      event.preventDefault(); event.stopPropagation();
      finishDrag?.();
      const widths = currentWidths();
      const start = widths[i];
      const rtl = getComputedStyle(table).direction === "rtl" ? -1 : 1;
      const pointer = event.pointerId;
      const cursor = document.body.style.cursor;
      const selection = document.body.style.userSelect;
      let pending = start;
      let dragFrame = 0;
      const flush = () => { dragFrame = 0; resize([...widths], pending); };
      const move = (e: PointerEvent) => {
        if (e.pointerId !== pointer) return;
        pending = start + (e.clientX - event.clientX) * rtl;
        if (!dragFrame) dragFrame = requestAnimationFrame(flush);
      };
      const end = () => {
        if (dragFrame) { cancelAnimationFrame(dragFrame); flush(); }
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
        handle.removeEventListener("pointercancel", up);
        handle.removeEventListener("lostpointercapture", end);
        window.removeEventListener("blur", end);
        handle.removeAttribute("data-dragging");
        if (handle.hasPointerCapture(pointer)) handle.releasePointerCapture(pointer);
        document.body.style.cursor = cursor;
        document.body.style.userSelect = selection;
        finishDrag = undefined;
        schedule();
      };
      const up = (e: PointerEvent) => { if (e.pointerId === pointer) end(); };
      finishDrag = end;
      handle.setPointerCapture(pointer);
      handle.setAttribute("data-dragging", "");
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
      handle.addEventListener("pointercancel", up);
      handle.addEventListener("lostpointercapture", end);
      window.addEventListener("blur", end);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    };
    handle.setAttribute("aria-valuemin", String(MIN_COLUMN_WIDTH));
    handle.setAttribute("aria-valuemax", String(MAX_COLUMN_WIDTH));
    handle.addEventListener("pointerdown", pointerdown);
    handle.addEventListener("keydown", keydown);
    handle.addEventListener("dblclick", reset);
    cleanups.push(() => {
      handle.removeEventListener("pointerdown", pointerdown);
      handle.removeEventListener("keydown", keydown);
      handle.removeEventListener("dblclick", reset);
    });
  });
  const visibility = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
    nearViewport = entries.some((entry) => entry.isIntersecting);
    if (nearViewport) schedule();
  }, { rootMargin: "256px" });
  visibility?.observe(wrapper);
  const observer = new ResizeObserver(schedule);
  observer.observe(wrapper);
  // Rows can change without remounting this table (filters, paging and sorting).
  const mutations = new MutationObserver(schedule);
  mutations.observe(table.tBodies[0], { childList: true, subtree: true, characterData: true });
  mutations.observe(table.tHead!, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class"] });
  window.addEventListener("resize", schedule);
  void document.fonts?.ready.then(schedule);
  schedule();
  return () => {
    disposed = true;
    finishDrag?.();
    cancelAnimationFrame(frame);
    visibility?.disconnect(); observer.disconnect(); mutations.disconnect();
    window.removeEventListener("resize", schedule);
    cleanups.forEach((cleanup) => cleanup());
    group.replaceChildren();
    table.style.removeProperty("width"); table.style.removeProperty("table-layout");
  };
}

import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("alternate_registries", Path(__file__).with_name("fetch-trial-alternate-registries.py"))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class IdentityAuditTests(unittest.TestCase):
    def test_both_td_and_th_headers_return_the_adjacent_value(self):
        for header in ("td", "th"):
            raw = f'<table><tr><{header}>Unique ID issued by UMIN</{header}><td>UMIN000011688</td></tr><tr><th>Official scientific title of the study</th><td>Trial A &amp; B</td></tr></table>'
            with patch.object(module, "get", return_value=(raw, "https://center6.umin.ac.jp/example")):
                result = module.audit_other("https://center6.umin.ac.jp/example")
            self.assertEqual(result["observedRegistryId"], "UMIN000011688")
            self.assertEqual(result["observedTitle"], "Trial A & B")

    def test_missing_identifier_does_not_read_a_later_unrelated_cell(self):
        raw = '<p>Unique ID issued by UMIN</p><table><tr><td>Condition</td><td>Nephrology</td></tr></table>'
        with patch.object(module, "get", return_value=(raw, "https://center6.umin.ac.jp/example")):
            result = module.audit_other("https://center6.umin.ac.jp/example")
        self.assertIsNone(result["observedRegistryId"])


if __name__ == "__main__":
    unittest.main()

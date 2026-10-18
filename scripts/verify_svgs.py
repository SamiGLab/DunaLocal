"""Parse social SVG templates with Python's standard library and reject external resources."""
from pathlib import Path
from xml.etree import ElementTree

paths = sorted(Path("social/templates").glob("*.svg"))
assert len(paths) >= 3, "Expected three editable template files"
for path in paths:
    xml = path.read_text(encoding="utf-8")
    root = ElementTree.fromstring(xml)
    assert root.tag.endswith("svg"), f"{path}: not an SVG root"
    assert 'viewBox="0 0 1080 1350"' in xml, f"{path}: wrong portrait dimensions"
    assert "<script" not in xml and "http://" not in xml, f"{path}: unexpected external content"
    assert "MUNKANÉV" in xml or "KÖZZÉTÉTEL ELŐTTI" in xml or "ÁTMENETI" in xml, f"{path}: missing draft marker"
    print(f"PASS: {path} ({len(xml)} chars)")

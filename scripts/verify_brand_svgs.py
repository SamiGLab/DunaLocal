"""Validate the four public Lokmira brand vectors and source/dist parity."""
from pathlib import Path
from xml.etree import ElementTree

names = ("focus-mark.svg", "focus-app-icon.svg", "focus-logo.svg", "favicon.svg")
for name in names:
    src = Path("brand") / name
    published = Path("dist") / "brand" / name
    text = src.read_text(encoding="utf-8")
    assert text == published.read_text(encoding="utf-8"), f"Source/build drift: {name}"
    root = ElementTree.fromstring(text)
    assert root.tag.endswith("svg"), f"Not an SVG: {name}"
    assert root.attrib.get("viewBox"), f"Missing viewBox: {name}"
    lower = text.lower()
    for banned in ("<script", "href=", "url(", "<foreignobject", "<iframe", "<image", "http-equiv", "onload=", "onclick="):
        assert banned not in lower, f"Unsafe SVG: {name}: {banned}"
    print(f"PASS Lokmira {name}: parsed, self-contained and deploy-synced")
assert sorted(p.name for p in Path("dist/brand").iterdir()) == sorted(names), "Unexpected deployed brand file"

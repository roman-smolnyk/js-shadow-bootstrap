import re
import sys
from pathlib import Path

import pyclip

ROOT = Path().absolute()
CONSOLE_DIR = Path(__file__).parent.absolute()

if __name__ == "__main__":
    file = Path("test2.js")

    with open(file, encoding="utf-8") as f:
        data = f.read()

    for dep in re.findall(r"// <import>(.+)</import>", data):
        path = CONSOLE_DIR / dep.strip()
        with open(path) as f2:
            data2 = f2.read()

        data = re.sub(rf"// <import>{re.escape(dep)}</import>", data2, data)

    print(data)
    pyclip.copy(data)

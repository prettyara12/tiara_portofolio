"""Generate the hero head-turn frames locally (free, CPU) with LivePortrait.

Setup (once, ~1.5 GB: CPU torch + model weights downloaded on first run):
    git clone https://github.com/jhj0517/AdvancedLivePortrait-WebUI <ALP_DIR>
    uv venv -p 3.11 <ALP_DIR>/.venv
    uv pip install -p <ALP_DIR>/.venv torch torchvision --index-url https://download.pytorch.org/whl/cpu
    uv pip install -p <ALP_DIR>/.venv -r <ALP_DIR>/requirements-cpu.txt

Usage (run with that venv's python, from the project root):
    <ALP_DIR>/.venv/Scripts/python scripts/headgrid.py <ALP_DIR> [--test]
Reads   design-src/cartoon/tiara-cartoon.png
Writes  raw frames to design-src/cartoon/grid/<col>_<row>.png (re-runs skip existing ones),
        transparent frames to public/head/<col>_<row>.webp, used by src/components/Portrait.tsx
        (col 0..COLS-1 = looking toward the viewer's left→right, row 0..ROWS-1 = up→down).
"""
import os
import sys
import time
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).parent))
from cutout import cutout  # noqa: E402

COLS, ROWS = 11, 9
YAW, PITCH = 20, 14  # max head turn in degrees (the model's limit is 20)
SIZE = 800
SRC = ROOT / 'design-src' / 'cartoon' / 'tiara-cartoon.png'
RAW = ROOT / 'design-src' / 'cartoon' / 'grid'
OUT = ROOT / 'public' / 'head'


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args:
        sys.exit(__doc__)
    alp = Path(args[0]).resolve()
    os.chdir(alp)  # the library resolves models/ and outputs/ relative to its own root
    sys.path.insert(0, str(alp))
    from modules.live_portrait.live_portrait_inferencer import LivePortraitInferencer

    lp = LivePortraitInferencer()
    lp.load_models()
    src = str(SRC)
    RAW.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    cells = [(c, r) for r in range(ROWS) for c in range(COLS)]
    if '--test' in sys.argv:
        cells = [(COLS // 2, ROWS // 2), (0, ROWS // 2), (COLS // 2, 0)]
    for col, row in cells:
        raw = RAW / f'{col}_{row}.png'
        if not raw.exists():
            t = time.time()
            yaw = (col / (COLS - 1) * 2 - 1) * YAW  # negative = toward the viewer's left
            pitch = (row / (ROWS - 1) * 2 - 1) * PITCH  # negative = looking up
            # The model's pupil_y is the other way round: positive = looking up.
            out = lp.edit_expression(rotate_yaw=yaw, rotate_pitch=pitch, pupil_x=yaw * 0.6,
                                     pupil_y=-pitch * 0.6, src_image=src)
            Image.fromarray(out).save(raw)
            print(f'{raw.stem} {time.time() - t:.1f}s', flush=True)
        cutout(Image.open(raw)).resize((SIZE, SIZE), Image.LANCZOS).save(OUT / f'{raw.stem}.webp', quality=82, method=6)


if __name__ == '__main__':
    main()

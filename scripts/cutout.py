"""Remove the plain grey studio background from the hero pose photos.

Usage:  python scripts/cutout.py [input_dir]        (default: design-src/poses)
Reads   <input>/tiara-<pose>.png
Writes  public/poses/<pose>.webp  (transparent, 1000px, used by src/components/Portrait.tsx)
Needs   pip install numpy pillow

shortcut: colour-keys a flat light-grey backdrop; for photos on a busy background use an ML matting tool (e.g. rembg) instead.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SIZE = 1000
LOW, HIGH = 14.0, 55.0  # colour distance from the backdrop: fully transparent below LOW, opaque above HIGH
OUT = Path(__file__).resolve().parent.parent / 'public' / 'poses'


def cutout(img: Image.Image) -> Image.Image:
    a = np.asarray(img.convert('RGB')).astype(np.float32)
    h, w, _ = a.shape
    edge = np.concatenate([a[:30].reshape(-1, 3), a[:, :30].reshape(-1, 3), a[:, -30:].reshape(-1, 3)])
    bg = np.median(edge, axis=0)
    dist = np.abs(a - bg).max(axis=-1)
    near = dist < LOW + 10

    # Only backdrop connected to the top/left/right edges counts, so light skin and eye whites stay opaque.
    fill = Image.fromarray((near * 255).astype(np.uint8)).copy()
    seeds = [(x, 0) for x in range(0, w, 8)] + [(0, y) for y in range(0, h, 8)] + [(w - 1, y) for y in range(0, h, 8)]
    for s in seeds:
        if fill.getpixel(s) == 255:
            ImageDraw.floodfill(fill, s, 128)
    conn = Image.fromarray(((np.asarray(fill) == 128) * 255).astype(np.uint8))
    band = np.asarray(conn.filter(ImageFilter.MaxFilter(9))) > 0
    # Backdrop pockets enclosed by hair strands are not flood-connected; key them too near the outline.
    band |= (np.asarray(conn.filter(ImageFilter.MaxFilter(25))) > 0) & near

    ramp = np.clip((dist - LOW) / (HIGH - LOW), 0, 1)
    alpha = np.where(band, ramp, 1.0)
    alpha = np.where(band & (dist < LOW), 0.0, alpha)
    al = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6)))
    al = al.astype(np.float32)[..., None] / 255

    # Un-mix the grey backdrop from soft edges so no light halo shows on the dark theme.
    soft = (al > 0.02) & (al < 0.98)
    fg = (a - (1 - al) * bg) / np.maximum(al, 0.05)
    rgb = np.where(soft, np.clip(fg, 0, 255), a)
    return Image.fromarray(np.concatenate([rgb, al * 255], axis=-1).astype(np.uint8), 'RGBA')


def main(src: Path) -> None:
    files = sorted(src.glob('tiara-*.png'))
    if not files:
        sys.exit(f'No tiara-*.png files in {src}')
    OUT.mkdir(parents=True, exist_ok=True)
    for f in files:
        name = f.stem.removeprefix('tiara-')
        cutout(Image.open(f)).resize((SIZE, SIZE), Image.LANCZOS).save(OUT / f'{name}.webp', quality=86, method=6)
        print('ok', name)


if __name__ == '__main__':
    main(Path(sys.argv[1] if len(sys.argv) > 1 else 'design-src/poses'))

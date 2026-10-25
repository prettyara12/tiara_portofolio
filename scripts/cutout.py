"""Remove the plain grey studio background from an image (used by scripts/headgrid.py).

Needs   numpy, pillow

shortcut: colour-keys a flat light-grey backdrop; for photos on a busy background use an ML matting tool (e.g. rembg) instead.
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

LOW, HIGH = 14.0, 55.0  # colour distance from the backdrop: fully transparent below LOW, opaque above HIGH


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
    # Shave 1px off the edge before softening: removes the light rim left on fine hair.
    al = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))
    al = np.asarray(al.filter(ImageFilter.GaussianBlur(0.6)))
    al = al.astype(np.float32)[..., None] / 255

    # Un-mix the grey backdrop from soft edges so no light halo shows on the dark theme.
    soft = (al > 0.02) & (al < 0.98)
    fg = (a - (1 - al) * bg) / np.maximum(al, 0.05)
    rgb = np.where(soft, np.clip(fg, 0, 255), a)
    return Image.fromarray(np.concatenate([rgb, al * 255], axis=-1).astype(np.uint8), 'RGBA')


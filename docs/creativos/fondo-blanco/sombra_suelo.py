import sys, numpy as np
from PIL import Image
from scipy import ndimage
src, out = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32); H, W, _ = a.shape
mn, mx = a.min(2), a.max(2)
neutral_pale = (mn > 190) & ((mx - mn) < 7)
obj = ndimage.binary_opening((mn < 236) & ~neutral_pale, iterations=2)
obj = ndimage.binary_fill_holes(ndimage.binary_closing(obj, iterations=3))
# pale pixels below the solid part of the product are floor reflection / baked shadow, not product
strong = ndimage.binary_opening(mn < 200, iterations=2)
pale = mn > 200
for x in range(W):
    ys = np.nonzero(strong[:, x])[0]
    if len(ys) == 0:
        obj[:, x] &= ~pale[:, x]; continue
    sb = ys.max() + 2
    obj[sb:, x] &= ~pale[sb:, x]
obj = ndimage.binary_opening(obj, iterations=1)
lab, n = ndimage.label(obj)
sizes = ndimage.sum(obj, lab, range(1, n + 1))
keep = [i + 1 for i, s in enumerate(sizes) if s > 0.002 * H * W]
obj = np.isin(lab, keep)
low = np.full(W, -1)
for x in range(W):
    ys = np.nonzero(obj[:, x])[0]
    if len(ys): low[x] = ys.max()
sh = np.zeros((H, W), np.float32)
for x in range(W):
    if low[x] < 0: continue
    ground = low[max(0, x - 60):min(W, x + 60)].max()
    w = np.clip(1 - (ground - low[x]) / 25.0, 0, 1)
    y = low[x]
    sh[max(0, y - 1):min(H, y + 4), x] += 0.9 * w + 0.15
    sh[y:min(H, y + 12), x] += 0.25
s = np.clip(ndimage.gaussian_filter(sh, (4, 8)) * 0.5 + ndimage.gaussian_filter(sh, (12, 30)) * 1.3, 0, 0.42)
# smooth transition at the object edge instead of a hard cut
keepmask = ndimage.gaussian_filter(ndimage.binary_erosion(obj, iterations=1).astype(np.float32), 1.2)
s = s * (1 - keepmask)
res = a * (1 - s)[..., None]
res = np.clip(res + np.random.default_rng(7).normal(0, 1.8, (H, W, 1)), 0, 255).astype(np.uint8)
Image.fromarray(res).save(out)

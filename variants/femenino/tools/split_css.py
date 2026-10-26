"""Split o3.css into a core file (every page) and per-page files.

Rule-level split: a rule moves out of the core only if it sits in one of the
page blocks AND none of its selectors use a class that the shared sections
(home, landing pages, header, popup, product card) render. At-rule blocks
(@media, @supports) are split the same way, rule by rule.

usage: python3 split_css.py src/o3.css out_dir theme_root
(theme_root: a full copy of the theme, used to read which classes the shared sections render)
"""
import re, sys, os, glob

src, out = sys.argv[1], sys.argv[2]
root = sys.argv[3]
css = open(src).read()

# Classes rendered by sections that appear on every kind of page or on the home/landings.
SHARED = ['o3-ehero', 'o3-marquee', 'o3-rail', 'o3-index', 'o3-spotlight', 'o3-manifesto', 'o3-about',
          'o3-signup', 'o3-popup', 'o3-chapters']
shared_files = [p for n in SHARED for p in glob.glob(f'{root}/sections/{n}.liquid')]
shared_files += glob.glob(f'{root}/snippets/o3-product-card.liquid') + glob.glob(f'{root}/snippets/o3-head.liquid')
used = set()
for f in shared_files:
    used |= set(re.findall(r'o3-[a-z0-9_-]+', open(f).read()))

# Block boundaries by banner title (inclusive start, up to next banner).
banners = [(m.start(), m.group(1).strip()) for m in re.finditer(r'/\* =+\n\s+([^\n]*)', css)]
def block_of(pos):
    name = '(top)'
    for start, title in banners:
        if start <= pos: name = title
        else: break
    return name

DEST = {'PAGES': 'pages', 'COLLECTION': 'pages', 'CONTACT': 'pages', 'TRACKING': 'pages', 'POLICIES': 'pages',
        'PRODUCT PAGE': 'product'}
def dest_for(block):
    for k, v in DEST.items():
        if block.startswith(k): return v
    return 'core'

def parse(text, base=0):
    """Yield (kind, prelude, body_or_text, start) for top-level items."""
    i, n = 0, len(text)
    items = []
    while i < n:
        # skip whitespace and comments
        m = re.match(r'\s+', text[i:])
        if m: i += m.end(); continue
        if text.startswith('/*', i):
            j = text.index('*/', i) + 2
            items.append(('comment', text[i:j], None, base + i)); i = j; continue
        j = text.find('{', i)
        semi = text.find(';', i)
        if semi != -1 and (j == -1 or semi < j):  # statement at-rule like @import
            items.append(('stmt', text[i:semi + 1], None, base + i)); i = semi + 1; continue
        prelude = text[i:j].strip()
        depth, k = 1, j + 1
        while depth:
            c = text[k]
            if c == '{': depth += 1
            elif c == '}': depth -= 1
            k += 1
        body = text[j + 1:k - 1]
        items.append(('block', prelude, body, base + i)); i = k
    return items

def classes(sel):
    return set(re.findall(r'\.(o3-[a-z0-9_-]+)', sel))

def route(prelude, block_dest):
    if block_dest == 'core': return 'core'
    if classes(prelude) & used: return 'core'
    return block_dest

outs = {'core': [], 'pages': [], 'product': []}
for kind, prelude, body, pos in parse(css):
    bd = dest_for(block_of(pos))
    if kind in ('comment', 'stmt'):
        (outs['core'] if bd == 'core' else outs[bd]).append(prelude); continue
    if prelude.startswith('@media') or prelude.startswith('@supports'):
        inner = {'core': [], 'pages': [], 'product': []}
        reduced = 'prefers-reduced-motion' in prelude
        for k2, p2, b2, _ in parse(body):
            if k2 == 'comment': continue
            txt = p2 if b2 is None else f'{p2} {{{b2}}}'
            if reduced and k2 == 'block' and not p2.startswith('@') and classes(p2) and not (classes(p2) & used):
                # Must keep coming after the rules it overrides, which now live in the page files.
                inner['pages'].append(txt); inner['product'].append(txt); continue
            inner[route(p2, bd) if k2 == 'block' and not p2.startswith('@') else ('core' if bd == 'core' else bd)].append(txt)
        for d, rules in inner.items():
            if rules: outs[d].append(f'{prelude} {{\n' + '\n'.join(rules) + '\n}')
        continue
    if prelude.startswith('@'):  # @font-face, @keyframes stay in core
        outs['core'].append(f'{prelude} {{{body}}}'); continue
    outs[route(prelude, bd)].append(f'{prelude} {{{body}}}')

os.makedirs(out, exist_ok=True)
names = {'core': 'o3.css', 'pages': 'o3-pages.css', 'product': 'o3-product.css'}
for d, chunks in outs.items():
    open(os.path.join(out, names[d]), 'w').write('\n'.join(chunks) + '\n')
    print(names[d], sum(len(c) for c in chunks))

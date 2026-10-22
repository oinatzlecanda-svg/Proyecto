/* Oelnor 3D hero — a slowly turning ring of curved product "prints" rendered
 * with three.js. Drag or scroll to spin it (momentum is kept), hover a print
 * to see its name, click to open the product. Three.js is only downloaded
 * when the hero is on screen; without WebGL the static fallback stays. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

async function mount(hero) {
  if (hero.dataset.oHeroMounted) return;
  hero.dataset.oHeroMounted = 'true';

  const host = hero.querySelector('[data-o-hero-canvas]');
  const dataEl = hero.querySelector('[data-o-hero-items]');
  const label = hero.querySelector('[data-o-hero-label]');
  if (!host || !dataEl || !webglAvailable()) return;

  let items = [];
  try {
    items = JSON.parse(dataEl.textContent).filter((i) => i && i.src);
  } catch (e) {
    return;
  }
  if (!items.length) return;

  const THREE = await import(hero.dataset.threeSrc);

  // Fill the ring so it never looks sparse with a small catalogue.
  const ring = [];
  const count = Math.min(14, Math.max(10, items.length));
  for (let i = 0; i < count; i++) ring.push(items[i % items.length]);

  const W = 2.4;
  const H = 3.2;
  const GAP = 0.55;
  const R = (count * (W + GAP)) / (Math.PI * 2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0e0d0c, R + 4, R * 2 + 12);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const camBase = new THREE.Vector3(0, 1.6, R + 9.5);
  camera.position.copy(camBase);

  const group = new THREE.Group();
  group.rotation.x = 0.06;
  scene.add(group);

  // Curved plane that follows the cylinder surface.
  const geo = new THREE.PlaneGeometry(W, H, 32, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const a = x / R;
    pos.setX(i, Math.sin(a) * R);
    pos.setZ(i, Math.cos(a) * R - R);
  }
  geo.computeVertexNormals();

  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');
  const planeAspect = W / H;
  const meshes = [];

  ring.forEach((item, i) => {
    const mat = new THREE.MeshBasicMaterial({
      color: 0x3a3631,
      transparent: true,
      opacity: 0,
      side: THREE.FrontSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const theta = (i / count) * Math.PI * 2;
    mesh.position.set(Math.sin(theta) * R, (i % 2 ? 0.28 : -0.28), Math.cos(theta) * R);
    mesh.rotation.y = theta;
    mesh.userData = { item, hover: 0, fade: 0, delay: i * 0.06 };
    group.add(mesh);
    meshes.push(mesh);

    loader.load(item.src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const ia = tex.image.width / tex.image.height;
      if (ia > planeAspect) {
        tex.repeat.set(planeAspect / ia, 1);
        tex.offset.set((1 - tex.repeat.x) / 2, 0);
      } else {
        tex.repeat.set(1, ia / planeAspect);
        tex.offset.set(0, (1 - tex.repeat.y) / 2);
      }
      mat.map = tex;
      mat.color.set(0xd9d3c9);
      mat.needsUpdate = true;
    });
  });

  // Floating dust, sand coloured.
  const dustCount = 420;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * R * 4;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * R * 4;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xc9b89b, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false })
  );
  scene.add(dust);

  // ---------- Interaction state ----------
  let rot = 0;
  let vel = reduceMotion ? 0 : 0.0016;
  const idle = reduceMotion ? 0 : 0.0016;
  let dragging = false;
  let lastX = 0;
  let lastT = 0;
  let dragMoved = 0;
  const mouse = new THREE.Vector2(0, 0);
  const mouseNdc = new THREE.Vector2(10, 10);
  const look = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  let hovered = null;
  let lastScroll = window.scrollY;

  const canvas = renderer.domElement;
  canvas.style.touchAction = 'pan-y';

  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    dragMoved = 0;
    lastX = e.clientX;
    lastT = performance.now();
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    mouseNdc.copy(mouse);
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    dragMoved += Math.abs(dx);
    rot += dx * 0.0042;
    vel = (dx * 0.0042) / Math.max(1, now - lastT) * 16;
    lastX = e.clientX;
    lastT = now;
  });

  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    // A tap (no drag) on a print opens its product.
    if (dragMoved < 6 && hovered && hovered.userData.item.url) {
      window.location.href = hovered.userData.item.url;
    }
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', () => {
    mouseNdc.set(10, 10);
    mouse.set(0, 0);
  });

  window.addEventListener(
    'scroll',
    () => {
      const d = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (!reduceMotion) vel += d * 0.00012;
    },
    { passive: true }
  );

  let lookX = 0;
  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull the camera back on narrow screens so the ring still fits.
    const narrow = clampNum(1.25 - camera.aspect * 0.35, 0, 0.9);
    camBase.z = R + 8 + narrow * 10;
    // Fog follows the camera so the back of the ring fades at any distance.
    scene.fog.near = camBase.z - R * 0.3;
    scene.fog.far = camBase.z + R * 1.4;
    // On wide screens the ring sits to the right, leaving room for the headline.
    lookX = camera.aspect > 1.2 ? -R * 0.42 : 0;
    camera.updateProjectionMatrix();
  }
  const clampNum = (v, a, b) => Math.min(b, Math.max(a, v));
  new ResizeObserver(resize).observe(host);
  resize();

  // ---------- Render loop (paused off-screen / hidden tab) ----------
  let visible = true;
  let rafId = 0;
  const wake = () => {
    if (!rafId) rafId = requestAnimationFrame(frame);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
  }).observe(hero);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && visible) wake();
  });

  let t0 = performance.now();

  function frame(now) {
    rafId = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min(64, now - t0) / 16.67;
    t0 = now;
    const elapsed = now / 1000;

    if (!dragging) {
      vel += (idle - vel) * 0.035 * dt;
      rot += vel * dt;
    }
    group.rotation.y = rot;

    look.x += (mouse.x - look.x) * 0.05 * dt;
    look.y += (mouse.y - look.y) * 0.05 * dt;
    camera.position.set(camBase.x + lookX + look.x * 1.2, camBase.y + look.y * 0.6, camBase.z);
    camera.lookAt(lookX, 0.2, 0);

    dust.rotation.y = elapsed * 0.02;
    dust.position.y = Math.sin(elapsed * 0.3) * 0.15;

    raycaster.setFromCamera(mouseNdc, camera);
    const hit = raycaster.intersectObjects(meshes, false)[0];
    const next = hit ? hit.object : null;
    if (next !== hovered) {
      hovered = next;
      canvas.style.cursor = hovered ? 'pointer' : dragging ? 'grabbing' : 'grab';
      if (label) {
        if (hovered) {
          label.textContent = hovered.userData.item.title || '';
          label.classList.add('is-active');
        } else {
          label.classList.remove('is-active');
        }
      }
    }

    meshes.forEach((m) => {
      const u = m.userData;
      u.fade = Math.min(1, u.fade + (elapsed > u.delay + 0.2 ? 0.02 * dt : 0));
      m.material.opacity = reduceMotion ? 1 : easeOut(u.fade);
      u.hover += ((m === hovered ? 1 : 0) - u.hover) * 0.12 * dt;
      const s = 1 + u.hover * 0.06;
      m.scale.set(s, s, 1);
    });

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(frame);
  }

  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  hero.classList.add('is-webgl');
  wake();
}

function boot(root = document) {
  root.querySelectorAll('[data-o-hero3d]').forEach((hero) => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        mount(hero).catch((err) => console.warn('[Oelnor] 3D hero disabled:', err));
      },
      { rootMargin: '200px' }
    );
    io.observe(hero);
  });
}

boot();
document.addEventListener('shopify:section:load', (e) => boot(e.target));

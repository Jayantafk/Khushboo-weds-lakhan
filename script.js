/* ===== Khushboo ♥ Lakhan — interactions ===== */

/* ---- Garland: build marigold strand ---- */
(function buildGarland() {
  const strand = document.getElementById('strand');
  if (!strand) return;
  const NS = 'http://www.w3.org/2000/svg';
  for (let x = 12; x <= 1200; x += 34) {
    const dip = 6 * Math.sin((x / 1200) * Math.PI * 6); // gentle waves
    const use = document.createElementNS(NS, 'use');
    use.setAttribute('href', '#marigold');
    use.setAttribute('x', x);
    use.setAttribute('y', 18 + dip);
    strand.appendChild(use);
    const leaf = document.createElementNS(NS, 'use');
    leaf.setAttribute('href', '#leaf');
    leaf.setAttribute('x', x + 17);
    leaf.setAttribute('y', 14 + dip);
    strand.appendChild(leaf);
  }
})();

/* ---- Countdown to the pheras: 22 July 2026, 10:00 IST ---- */
(function countdown() {
  const target = new Date('2026-07-22T10:00:00+05:30').getTime();
  const el = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };
  if (!el.d) return;

  function tick() {
    let diff = target - Date.now();
    if (diff <= 0) {
      el.d.textContent = '0';
      el.h.textContent = '0';
      el.m.textContent = '0';
      el.s.textContent = '0';
      const box = document.getElementById('countdown');
      if (box && !box.dataset.done) {
        box.dataset.done = '1';
        box.insertAdjacentHTML('afterend',
          '<p style="margin-top:1rem;font-family:\'Rozha One\',serif;color:#7B1E26;font-size:1.2rem;">शुभ विवाह सम्पन्न 💐</p>');
      }
      clearInterval(timer);
      return;
    }
    const day = Math.floor(diff / 864e5);
    const hr = Math.floor(diff / 36e5) % 24;
    const min = Math.floor(diff / 6e4) % 60;
    const sec = Math.floor(diff / 1e3) % 60;
    el.d.textContent = day;
    el.h.textContent = String(hr).padStart(2, '0');
    el.m.textContent = String(min).padStart(2, '0');
    el.s.textContent = String(sec).padStart(2, '0');
  }
  tick();
  const timer = setInterval(tick, 1000);
})();

/* ---- Floating petals in hero ---- */
(function petals() {
  const wrap = document.getElementById('petals');
  if (!wrap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const glyphs = ['🌸', '🌼', '✿', '❀'];
  const count = matchMedia('(max-width: 640px)').matches ? 8 : 14;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = glyphs[i % glyphs.length];
    p.style.left = Math.random() * 100 + '%';
    p.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
    p.style.animationDuration = (9 + Math.random() * 10) + 's';
    p.style.animationDelay = -(Math.random() * 12) + 's';
    wrap.appendChild(p);
  }
})();

/* ---- Reveal on scroll ---- */
(function reveal() {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();

/* ---- Lightbox for card gallery ---- */
(function lightbox() {
  const imgs = Array.from(document.querySelectorAll('.card-grid img'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  if (!lb || !imgs.length) return;
  let idx = 0;

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[idx].src;
    lbImg.alt = imgs[idx].alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  imgs.forEach((img, i) => img.addEventListener('click', () => show(i)));
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', (e) => { e.stopPropagation(); show(idx - 1); });
  document.getElementById('lb-next').addEventListener('click', (e) => { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();

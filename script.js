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

/* ---- Toast ---- */
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._hide);
  t._hide = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ---- Add all events to calendar (.ics download) ---- */
(function calendar() {
  // Times in UTC (IST − 5:30)
  const EVENTS = [
    ['फूलों की हल्दी', '20260721T033000Z', '20260721T043000Z'],
    ['बत्तीसी & मायरा', '20260721T043000Z', '20260721T063000Z'],
    ['Reception', '20260721T063500Z', '20260721T093000Z'],
    ['टीका-मिलनी', '20260721T113000Z', '20260721T123000Z'],
    ['संगीत संध्या', '20260721T123000Z', '20260721T163000Z'],
    ['बारात का स्वागत · पाणिग्रहण एवं शुभ फेरे', '20260722T043000Z', '20260722T083000Z'],
  ];
  const LOCATION = 'Jnanakshi Convention Hall\\, Hassan\\, Karnataka';

  function buildICS() {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Khushboo weds Lakhan//Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];
    EVENTS.forEach(([title, start, end], i) => {
      lines.push(
        'BEGIN:VEVENT',
        `UID:event-${i + 1}@khushboo-weds-lakhan`,
        'DTSTAMP:20260101T000000Z',
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${title} — Khushboo ♥ Lakhan`,
        `LOCATION:${LOCATION}`,
        'DESCRIPTION:Khushboo weds Lakhan — शुभ विवाह',
        'END:VEVENT'
      );
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  document.querySelectorAll('[data-add-cal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Khushboo-Lakhan-Wedding.ics';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      toast('📅 कैलेंडर फ़ाइल डाउनलोड हुई — खोलकर सभी कार्यक्रम जोड़ें');
    });
  });
})();

/* ---- Share: copy link / WhatsApp / native ---- */
(function share() {
  const shareText = '💍 Khushboo ♥ Lakhan — शुभ विवाह\n21–22 July 2026 · Jnanakshi Convention Hall, Hassan\nनिमंत्रण देखें: ';

  function copyLink() {
    const url = location.href.split('#')[0];
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => toast('🔗 Link copied! · लिंक कॉपी हो गया'),
        () => fallbackCopy(url)
      );
    } else {
      fallbackCopy(url);
    }
  }
  function fallbackCopy(url) {
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      toast('🔗 Link copied! · लिंक कॉपी हो गया');
    } catch (e) {
      toast('कॉपी नहीं हो सका — कृपया एड्रेस बार से लिंक कॉपी करें');
    }
    ta.remove();
  }

  document.querySelectorAll('[data-copy-link]').forEach((btn) =>
    btn.addEventListener('click', copyLink)
  );

  const wa = document.getElementById('wa-share');
  if (wa) {
    wa.href = 'https://wa.me/?text=' + encodeURIComponent(shareText + location.href.split('#')[0]);
  }

  const native = document.getElementById('native-share');
  if (native && navigator.share) {
    native.hidden = false;
    native.addEventListener('click', () => {
      navigator.share({
        title: 'Khushboo ♥ Lakhan — Wedding Invitation',
        text: shareText,
        url: location.href.split('#')[0],
      }).catch(() => {});
    });
  }
})();

/* ---- RSVP via WhatsApp ---- */
(function rsvp() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;
  const RSVP_NUMBER = '919340325278'; // वधू-पक्ष contact from the invitation card

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('rsvp-name');
    const phoneEl = document.getElementById('rsvp-phone');
    const guests = document.getElementById('rsvp-guests').value;
    const name = nameEl.value.trim();
    const phone = phoneEl.value.replace(/[^\d+]/g, '');

    nameEl.classList.toggle('invalid', !name);
    phoneEl.classList.toggle('invalid', phone.replace(/\D/g, '').length < 10);
    if (!name) { toast('कृपया अपना नाम लिखें'); nameEl.focus(); return; }
    if (phone.replace(/\D/g, '').length < 10) { toast('कृपया सही फ़ोन नंबर लिखें'); phoneEl.focus(); return; }

    const msg =
      '🙏 RSVP — Khushboo ♥ Lakhan विवाह\n' +
      `नाम: ${name}\n` +
      `फ़ोन: ${phoneEl.value.trim()}\n` +
      `सदस्य: ${guests}\n` +
      'हम विवाह समारोह में सम्मिलित होंगे। 💐';
    window.open('https://wa.me/' + RSVP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    toast('💌 WhatsApp खुल रहा है — कृपया संदेश भेज दें');
  });
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

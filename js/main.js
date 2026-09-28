(function () {
  'use strict';

  var C = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Amplop pembuka ---------- */
  var intro = $('intro');
  var introBtn = $('introBtn');
  var envelope = $('envelope');
  var opened = false;

  function startMusic() {
    var audio = $('bgm');
    var btn = $('musicBtn');
    if (audio && C.music && !btn.hidden) {
      audio.play().then(function () {
        btn.setAttribute('aria-pressed', 'true');
      }).catch(function () {});
    }
  }

  function openIntro() {
    if (opened || !intro) return;
    opened = true;
    startMusic();
    if (reduceMotion) {
      intro.classList.add('done');
      document.body.classList.remove('locked');
      return;
    }
    intro.classList.add('open');
    setTimeout(function () {
      intro.classList.add('done');
      document.body.classList.remove('locked');
    }, 1500);
  }

  if (intro && document.documentElement.classList.contains('js')) {
    document.body.classList.add('locked');
    introBtn.addEventListener('click', openIntro);
    envelope.addEventListener('click', openIntro);
    introBtn.focus({ preventScroll: true });
  }

  /* ---------- Hitung hari bersama ---------- */
  var dayEl = $('dayCount');
  var start = new Date(C.startDate || '2026-04-20T00:00:00');
  var diffDays = Math.max(0, Math.floor((new Date() - start) / 86400000));

  if (reduceMotion || diffDays === 0) {
    dayEl.textContent = diffDays;
  } else {
    var t0 = null;
    var dur = 1600;
    var tick = function (ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      dayEl.textContent = Math.round(diffDays * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Hati melayang di hero ---------- */
  if (!reduceMotion) {
    var wrap = $('floatingHearts');
    for (var i = 0; i < 14; i++) {
      var h = document.createElement('span');
      h.className = 'heart-particle';
      h.textContent = '♥';
      h.style.left = (Math.random() * 100) + '%';
      h.style.fontSize = (10 + Math.random() * 14) + 'px';
      h.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
      h.style.animationDuration = (9 + Math.random() * 8) + 's';
      h.style.animationDelay = (Math.random() * 10) + 's';
      wrap.appendChild(h);
    }
  }

  /* ---------- Kelopak bunga jatuh (canvas) ---------- */
  (function initPetals() {
    if (reduceMotion) return;
    var cv = $('petals');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var W, H;
    var colors = ['rgba(242,201,210,', 'rgba(231,206,147,', 'rgba(214,120,142,'];
    var petals = [];

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function make(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : -20,
        s: 6 + Math.random() * 7,
        vy: 0.4 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.4,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.03,
        sw: Math.random() * 6.28,
        c: colors[(Math.random() * colors.length) | 0]
      };
    }

    resize();
    window.addEventListener('resize', resize);
    var n = W < 600 ? 14 : 24;
    for (var i = 0; i < n; i++) petals.push(make(true));

    function draw() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < petals.length; i++) {
          var p = petals[i];
          p.y += p.vy;
          p.sw += 0.02;
          p.x += p.vx + Math.sin(p.sw) * 0.5;
          p.rot += p.vr;
          if (p.y > H + 20 || p.x < -30 || p.x > W + 30) {
            petals[i] = make(false);
            continue;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.c + '0.55)';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.283);
          ctx.fill();
          ctx.restore();
        }
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();

  /* ---------- Muncul saat di-scroll (linimasa dan rute) ---------- */
  var timelineItems = document.querySelectorAll('.timeline-item');
  var route = $('route');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    timelineItems.forEach(function (el) { obs.observe(el); });
    if (route) obs.observe(route);
  } else {
    timelineItems.forEach(function (el) { el.classList.add('is-visible'); });
    if (route) route.classList.add('is-visible');
  }

  if (reduceMotion) {
    var heartAnim = document.querySelector('#routeHeart animateMotion');
    if (heartAnim) heartAnim.parentNode.removeChild(heartAnim);
  }

  /* ---------- Kartu alasan (bisa dibalik) ---------- */
  var grid = $('reasonsGrid');
  (C.reasons || []).forEach(function (text, idx) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'flip-card';
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', 'Alasan ' + (idx + 1) + ', ketuk untuk membuka');

    var inner = document.createElement('span');
    inner.className = 'flip-inner';
    var front = document.createElement('span');
    front.className = 'flip-face flip-front';
    front.textContent = '♥';
    front.setAttribute('aria-hidden', 'true');
    var back = document.createElement('span');
    back.className = 'flip-face flip-back';
    back.textContent = text;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.addEventListener('click', function () {
      var on = card.getAttribute('aria-pressed') === 'true';
      card.setAttribute('aria-pressed', on ? 'false' : 'true');
    });
    grid.appendChild(card);
  });

  /* ---------- Galeri polaroid ---------- */
  var gal = $('polaroids');
  var rots = [-4, 3, -2, 4, -3, 2];
  var photos = (C.photos && C.photos.length) ? C.photos : [
    { caption: 'Foto pertama kita' },
    { caption: 'Segera di sini' },
    { caption: 'Suatu hari nanti' }
  ];
  photos.forEach(function (p, i) {
    var fig = document.createElement('figure');
    fig.className = 'polaroid';
    fig.style.setProperty('--rot', rots[i % rots.length] + 'deg');
    var frame = document.createElement('div');
    frame.className = 'frame';
    if (p.src) {
      var img = document.createElement('img');
      img.src = p.src;
      img.alt = p.caption || 'Foto kenangan';
      img.loading = 'lazy';
      frame.appendChild(img);
    } else {
      frame.textContent = '♥';
      frame.setAttribute('aria-hidden', 'true');
    }
    var cap = document.createElement('figcaption');
    cap.textContent = p.caption || '';
    fig.appendChild(frame);
    fig.appendChild(cap);
    gal.appendChild(fig);
  });

  /* ---------- Hitung mundur ulang tahun ---------- */
  (function birthday() {
    var b = C.birthday || { day: 24, month: 2, year: 2003 };
    var dEl = $('cdD'), hEl = $('cdH'), mEl = $('cdM'), sEl = $('cdS');
    var lead = $('bdLead');
    var box = $('countdown');
    var title = $('bdTitle');

    function target() {
      var n = new Date();
      var y = n.getFullYear();
      var endToday = new Date(y, b.month - 1, b.day, 23, 59, 59);
      var t = new Date(y, b.month - 1, b.day, 0, 0, 0);
      if (n > endToday) t = new Date(y + 1, b.month - 1, b.day, 0, 0, 0);
      return t;
    }

    function pad(x) { return x < 10 ? '0' + x : '' + x; }

    function update() {
      var n = new Date();
      var t = target();
      var age = t.getFullYear() - b.year;

      if (n >= t && n.getDate() === b.day && n.getMonth() === b.month - 1) {
        title.textContent = 'Selamat Ulang Tahun, Dinda';
        lead.textContent = 'Hari ini hari istimewa. Semoga tahun ke-' + age + ' penuh hal baik.';
        box.style.display = 'none';
        return;
      }
      var diff = t - n;
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor(diff / 3600000) % 24;
      var mins = Math.floor(diff / 60000) % 60;
      var secs = Math.floor(diff / 1000) % 60;
      dEl.textContent = days;
      hEl.textContent = pad(hours);
      mEl.textContent = pad(mins);
      sEl.textContent = pad(secs);
      lead.textContent = 'Menuju usia ke-' + age + ', 24 Februari ' + t.getFullYear() + '.';
    }
    update();
    setInterval(update, 1000);
  })();

  /* ---------- Surat: efek mesin tik ---------- */
  var letter = $('letterText');
  if (letter && !reduceMotion && 'IntersectionObserver' in window) {
    var full = letter.textContent;
    letter.setAttribute('aria-label', full);
    letter.style.minHeight = letter.offsetHeight + 'px';
    letter.textContent = '';
    var typed = false;
    var lobs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !typed) {
        typed = true;
        lobs.disconnect();
        var i = 0;
        var timer = setInterval(function () {
          i++;
          letter.textContent = full.slice(0, i);
          if (i >= full.length) clearInterval(timer);
        }, 28);
      }
    }, { threshold: 0.6 });
    lobs.observe(letter);
  }

  /* ---------- Tombol hati (ledakan) ---------- */
  var heartBtn = $('heartBtn');
  heartBtn.addEventListener('click', function () {
    if (reduceMotion) return;
    var r = heartBtn.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    for (var i = 0; i < 22; i++) {
      var h = document.createElement('span');
      h.className = 'burst-heart';
      h.textContent = '♥';
      var a = Math.random() * Math.PI * 2;
      var d = 60 + Math.random() * 100;
      h.style.setProperty('--bx', Math.cos(a) * d + 'px');
      h.style.setProperty('--by', (Math.sin(a) * d - 40) + 'px');
      h.style.left = cx + 'px';
      h.style.top = cy + 'px';
      h.style.fontSize = (12 + Math.random() * 12) + 'px';
      document.body.appendChild(h);
      (function (node) { setTimeout(function () { node.remove(); }, 1200); })(h);
    }
  });

  /* ---------- Hati kecil muncul di setiap ketukan ---------- */
  if (!reduceMotion) {
    document.addEventListener('pointerdown', function (e) {
      if (document.body.classList.contains('locked')) return;
      var h = document.createElement('span');
      h.className = 'pop-heart';
      h.textContent = '♥';
      h.style.left = e.clientX + 'px';
      h.style.top = e.clientY + 'px';
      h.style.fontSize = (14 + Math.random() * 10) + 'px';
      document.body.appendChild(h);
      setTimeout(function () { h.remove(); }, 950);
    });
  }

  /* ---------- Kartu kontak ---------- */
  var WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>';
  var IG_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>';

  function makeBtn(cls, href, icon, label) {
    var a = document.createElement('a');
    a.className = 'btn ' + cls;
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = icon + '<span></span>';
    a.lastChild.textContent = label;
    return a;
  }

  var cg = $('contactGrid');
  (C.contacts || []).forEach(function (p) {
    var card = document.createElement('div');
    card.className = 'contact-card';

    var av = document.createElement('div');
    av.className = 'avatar';
    av.textContent = p.initial || (p.name || '?').charAt(0);
    var name = document.createElement('h3');
    name.textContent = p.name;
    var note = document.createElement('p');
    note.textContent = p.note || '';

    var row = document.createElement('div');
    row.className = 'btn-row';
    if (p.wa) {
      var waHref = 'https://wa.me/' + p.wa + (p.waText ? '?text=' + encodeURIComponent(p.waText) : '');
      row.appendChild(makeBtn('btn-wa', waHref, WA_ICON, 'Chat WhatsApp'));
    }
    if (p.ig) {
      row.appendChild(makeBtn('btn-ig', p.ig, IG_ICON, 'Buka Instagram'));
    }

    card.appendChild(av);
    card.appendChild(name);
    card.appendChild(note);
    card.appendChild(row);
    cg.appendChild(card);
  });

  /* ---------- Musik latar (opsional) ---------- */
  var audio = $('bgm');
  var musicBtn = $('musicBtn');
  if (C.music) {
    audio.src = C.music;
    musicBtn.hidden = false;
    musicBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
        musicBtn.setAttribute('aria-pressed', 'true');
        musicBtn.setAttribute('aria-label', 'Jeda musik');
      } else {
        audio.pause();
        musicBtn.setAttribute('aria-pressed', 'false');
        musicBtn.setAttribute('aria-label', 'Putar musik');
      }
    });
  }
})();

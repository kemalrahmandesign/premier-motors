/* Premier Motors: motion, header, open/closed status, appointment form. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PM = window.PM || {};

  /* ---------- Motion: reveals, word-rise headlines, count-ups ---------- */
  function splitWords(el) {
    if (el.dataset.split === 'done') return;
    var accent = (el.dataset.accent || '').toLowerCase().split(',').map(function (w) { return w.trim(); }).filter(Boolean);
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.textContent = '';
    words.forEach(function (w, i) {
      var wrap = document.createElement('span');
      wrap.className = 'word';
      wrap.setAttribute('aria-hidden', 'true');
      var bare = w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
      var acc = accent.map(function (a) { return a.normalize('NFD').replace(/[̀-ͯ]/g, ''); });
      if (acc.indexOf(bare) > -1) wrap.classList.add('word--accent');
      var inner = document.createElement('span');
      inner.textContent = w;
      inner.style.setProperty('--wd', i * 55 + 'ms');
      wrap.appendChild(inner);
      el.appendChild(wrap);
      el.appendChild(document.createTextNode(' '));
    });
    el.dataset.split = 'done';
  }

  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    var target = parseFloat(el.dataset.count);
    var start = performance.now();
    var dur = 1500;
    function frame(now) {
      var p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target;
    }
    requestAnimationFrame(frame);
  }

  function initMotion() {
    document.querySelectorAll('.split').forEach(splitWords);
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal], .split'));
    function reveal(el) {
      if (el.classList.contains('in')) return;
      el.classList.add('in');
      el.querySelectorAll('[data-count]').forEach(countUp);
    }
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(reveal);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
    function inView() {
      var vh = window.innerHeight;
      targets.forEach(function (el) {
        if (el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.96 && r.bottom > 0) reveal(el);
      });
    }
    inView();
    window.addEventListener('load', inView);
    // Anchor jumps skip past sections; reveal everything above the viewport too.
    window.addEventListener('hashchange', function () { setTimeout(function () {
      targets.forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) reveal(el); });
    }, 60); });
  }

  /* ---------- Header, progress bar, mobile bar ---------- */
  function initScrollUI() {
    var prog = document.querySelector('.scroll-prog');
    var header = document.getElementById('header');
    var bar = document.getElementById('mobileCta');
    var form = document.getElementById('bookForm');
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var st = window.scrollY;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        if (prog) prog.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
        if (header) header.classList.toggle('scrolled', st > 12);
        if (bar && form) {
          var r = form.getBoundingClientRect();
          bar.classList.toggle('hide', r.top < window.innerHeight * 0.85 && r.bottom > 80);
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var toggle = document.getElementById('menuToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.addEventListener('click', function (e) {
        if (e.target.closest('a')) { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && links.classList.contains('open')) { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
      });
    }
  }

  /* ---------- Open / closed status (shop time, America/New_York) ---------- */
  function initStatus() {
    var els = document.querySelectorAll('[data-open-status]');
    if (!els.length || !PM.hours) return;
    function nowNY() {
      try {
        var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
        var o = {};
        parts.forEach(function (p) { o[p.type] = p.value; });
        return { day: o.weekday, mins: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
      } catch (e) { return null; }
    }
    function toMin(s) { var a = s.split(':'); return +a[0] * 60 + +a[1]; }
    function render() {
      var n = nowNY();
      if (!n) return;
      var weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(n.day) > -1;
      var open = toMin(PM.hours.open), close = toMin(PM.hours.close);
      var isOpen = weekday && n.mins >= open && n.mins < close;
      els.forEach(function (el) {
        var es = el.dataset.lang === 'es';
        var txt;
        if (isOpen) txt = es ? 'Abierto ahora · cierra a las 5:00 PM' : 'Open now · closes 5:00 PM';
        else if (weekday && n.mins < open) txt = es ? 'Cerrado · abre hoy a las 8:00 AM' : 'Closed · opens today 8:00 AM';
        else if (n.day === 'Fri' || n.day === 'Sat' || n.day === 'Sun') txt = es ? 'Cerrado · abre el lunes 8:00 AM' : 'Closed · opens Monday 8:00 AM';
        else txt = es ? 'Cerrado · abre mañana 8:00 AM' : 'Closed · opens tomorrow 8:00 AM';
        el.innerHTML = '<span class="status-dot' + (isOpen ? ' open' : '') + '"></span><span>' + txt + '</span>';
      });
    }
    render();
    setInterval(render, 60000);
  }

  /* ---------- Appointment form ---------- */
  function initForm() {
    var form = document.getElementById('bookForm');
    if (!form) return;
    var es = form.dataset.lang === 'es';
    var status = document.getElementById('formStatus');
    var select = form.querySelector('[name="service"]');
    var msg = form.querySelector('[name="message"]');
    var date = form.querySelector('[name="preferred_date"]');
    if (date) { try { date.min = new Date().toISOString().slice(0, 10); } catch (e) {} }

    // "Book this special" / "Get a free estimate" buttons pre-fill the service.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-service]');
      if (!a || !select) return;
      select.value = a.dataset.service;
      if (a.dataset.special && msg && !msg.value) msg.value = (es ? 'Me interesa el especial: ' : 'I’d like to book the special: ') + a.dataset.special;
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var bad = [];
      [name, phone].forEach(function (f) { f.classList.remove('invalid'); if (!f.value.trim()) bad.push(f); });
      if (phone.value.trim() && phone.value.replace(/\D/g, '').length < 10) bad.push(phone);
      if (bad.length) {
        bad.forEach(function (f) { f.classList.add('invalid'); });
        bad[0].focus();
        status.className = 'form-status error';
        status.textContent = es ? 'Por favor escriba su nombre y un número de teléfono válido.' : 'Please enter your name and a valid phone number.';
        return;
      }
      if (form.querySelector('[name="_honey"]').value) return;

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = es ? 'Enviando…' : 'Sending…';

      fetch(PM.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || (res.j && (res.j.success === false || res.j.success === 'false'))) throw new Error('send failed');
          form.classList.add('sent');
          status.className = 'form-status';
          status.textContent = es
            ? '¡Gracias! Recibimos su solicitud y le llamaremos pronto para confirmar.'
            : 'Thank you! We got your request and will call you shortly to confirm.';
          if (window.gtag) window.gtag('event', 'generate_lead', { form: 'appointment' });
        })
        .catch(function () {
          btn.disabled = false;
          status.className = 'form-status error';
          status.innerHTML = (es ? 'No se pudo enviar. Llámenos al ' : 'Something went wrong. Please call us at ') + '<a href="tel:+13013402130"><u>(301) 340-2130</u></a>.';
        });
    });
  }

  /* ---------- Call-click analytics ---------- */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-tel]') && window.gtag) window.gtag('event', 'click_to_call');
  });

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  initMotion();
  initScrollUI();
  initStatus();
  initForm();
})();

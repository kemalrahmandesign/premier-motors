// Page shell: <head>, SEO meta, header, footer, mobile action bar.
import { readFileSync } from 'node:fs';

const sprite = readFileSync(new URL('./sprite.svg', import.meta.url), 'utf8');

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const icon = (name, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

export const tel = (site, label, cls = '', extra = '') =>
  `<a class="${cls}" href="tel:${site.phoneE164}" data-tel${extra}>${label ?? esc(site.phone)}</a>`;

export const addressLine = (site) =>
  `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

// Nav is shared across pages; anchors point at homepage sections.
const nav = (lang) =>
  lang === 'es'
    ? [
        ['/es/#especiales', 'Especiales'],
        ['/es/#carroceria', 'Carrocería'],
        ['/es/#servicios', 'Servicios'],
        ['/es/#contacto', 'Contacto'],
        ['/', 'English'],
      ]
    : [
        ['/#specials', 'Specials'],
        ['/body-shop/', 'Body Shop'],
        ['/auto-repair/', 'Repairs'],
        ['/maryland-state-inspection/', 'MD Inspection'],
        ['/carmax-maxcare/', 'CarMax MaxCare'],
        ['/#contact', 'Contact'],
      ];

function head(site, page) {
  const url = site.siteUrl ? site.siteUrl.replace(/\/$/, '') + page.path : '';
  const ogImg = site.siteUrl ? site.siteUrl.replace(/\/$/, '') + '/assets/img/og-image.jpg' : '/assets/img/og-image.jpg';
  const schemas = (page.schema || []).map(
    (s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`,
  );
  const alt = page.alternates || [];
  const ga = site.ga4Id
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(site.ga4Id)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(site.ga4Id)}');</script>`
    : '';
  return `<!DOCTYPE html>
<html lang="${page.lang || 'en'}">
<head>
<meta charset="UTF-8">
<script>document.documentElement.classList.add('js')</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.redirect ? `<meta http-equiv="refresh" content="1;url=${esc(page.redirect)}">` : ''}
<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
${url ? `<link rel="canonical" href="${url}">` : ''}
${site.siteUrl ? alt.map(([hl, p]) => `<link rel="alternate" hreflang="${hl}" href="${site.siteUrl.replace(/\/$/, '')}${p}">`).join('\n') : ''}
${site.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(site.googleSiteVerification)}">` : ''}
<meta name="geo.region" content="US-MD">
<meta name="geo.placename" content="Rockville">
<meta name="theme-color" content="#0a0a0a">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${page.lang === 'es' ? 'es_US' : 'en_US'}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
${url ? `<meta property="og:url" content="${url}">` : ''}
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Premier Motors LLC logo">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&family=Michroma&display=swap">
<link rel="preload" as="image" href="/assets/img/logo-mark.png">
<link rel="stylesheet" href="/assets/css/style.css?v=${page.buildId}">
${schemas.join('\n')}
${ga}
</head>`;
}

function utility(site, lang) {
  const es = lang === 'es';
  return `<div class="utility">
  <div class="wrap">
    <a class="util-item" href="${site.googleMapsUrl}" target="_blank" rel="noopener">${icon('pin')}<span>${esc(addressLine(site))}</span></a>
    <span class="util-item util-secondary">${icon('clock')}<span>${es ? 'Lun – Vie · 8:00 AM – 5:00 PM' : `Mon – Fri · ${site.hours.display}`}</span></span>
    <span class="util-item util-status" data-open-status data-lang="${es ? 'es' : 'en'}"></span>
    <span class="util-spacer"></span>
    <a class="util-item util-mc" href="/carmax-maxcare/">${icon('badge')}<span>${es ? 'Aceptamos CarMax MaxCare' : 'CarMax MaxCare accepted'}</span></a>
    ${es ? '' : `<a class="util-item util-es" href="/es/" hreflang="es" lang="es">${icon('globe')}<span>Se habla español</span></a>`}
  </div>
</div>`;
}

function header(site, lang) {
  const es = lang === 'es';
  const links = nav(lang)
    .map(([href, label]) => `<a href="${href}"${href === '/es/' || href.startsWith('/es/') ? '' : ''}>${label}</a>`)
    .join('\n        ');
  return `<header class="header" id="header">
  <div class="wrap">
    <a class="brand" href="${es ? '/es/' : '/'}" aria-label="Premier Motors LLC home">
      <img class="brand-mark" src="/assets/img/logo-mark-sm.png" alt="" width="199" height="127">
      <img class="brand-word" src="/assets/img/wordmark.png" alt="Premier Motors" width="721" height="100">
    </a>
    <nav class="nav" aria-label="Main">
      <div class="nav-links" id="navLinks">
        ${links}
        ${es ? '' : '<a class="nav-es" href="/es/" hreflang="es" lang="es">Español</a>'}
      </div>
      <div class="nav-cta">
        <a class="btn btn--ghost" href="tel:${site.phoneE164}" data-tel>${icon('phone')}<span>${esc(site.phone)}</span></a>
        <a class="btn btn--primary" href="${es ? '/es/#contacto' : '/#contact'}" data-appt>${es ? 'Pedir una cita' : 'Request appointment'}</a>
        <button class="btn btn--ghost menu-toggle" id="menuToggle" aria-label="${es ? 'Menú' : 'Menu'}" aria-expanded="false" aria-controls="navLinks">${icon('menu', 'icon icon-open')}${icon('close', 'icon icon-close')}</button>
      </div>
    </nav>
  </div>
</header>`;
}

export function ctaBand(site, lang = 'en') {
  const es = lang === 'es';
  return `<section class="cta-band">
  <div class="wrap">
    <div data-reveal>
      <h2>${es ? '¿Su auto hace un ruido raro? No espere.' : 'Car making a noise? Don\u2019t wait.'}</h2>
      <p>${es ? 'Servicio el mismo día en la mayoría de los trabajos comunes. Presupuestos gratis.' : 'Same-day service on most common jobs. Free estimates. Walk-ins welcome.'}</p>
    </div>
    <div class="hero-actions" data-reveal style="--rd:120ms">
      <a class="btn btn--dark btn--lg" href="tel:${site.phoneE164}" data-tel>${icon('phone')}<span>${esc(site.phone)}</span></a>
      <a class="btn btn--outline-dark btn--lg" href="${es ? '/es/#contacto' : '/#contact'}" data-appt>${icon('calendar')}${es ? 'Pedir una cita' : 'Request an appointment'}</a>
    </div>
  </div>
</section>`;
}

function footer(site, lang) {
  const es = lang === 'es';
  const social = (site.social || [])
    .filter((s) => s.url)
    .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}">${icon(s.icon || 'ext')}</a>`)
    .join('');
  return `<footer class="footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-col">
        <a class="foot-brand" href="${es ? '/es/' : '/'}"><img src="/assets/img/logo-full.webp" alt="Premier Motors LLC" width="1098" height="533"></a>
        <p class="foot-about">${es
          ? 'Taller mecánico, hojalatería y pintura en Rockville, MD desde 2003. Servicio honesto en cada trabajo.'
          : 'Car repair, auto mechanic and body shop in Rockville, MD since 2003. Service and honesty on every job.'}</p>
        ${social ? `<div class="foot-socials">${social}</div>` : ''}
      </div>
      <div class="foot-col foot-col--svc">
        <div class="foot-title">${es ? 'Servicios' : 'Services'}</div>
        <a href="/#specials">${es ? 'Especiales' : 'Specials'}</a>
        <a href="/body-shop/">${es ? 'Carrocería y colisión' : 'Body shop & collision'}</a>
        <a href="/auto-repair/">${es ? 'Reparación mecánica' : 'Auto repair services'}</a>
        <a href="/maryland-state-inspection/">${es ? 'Inspección estatal de MD' : 'MD state inspection'}</a>
        <a href="/oil-change/">${es ? 'Cambio de aceite' : 'Oil change special'}</a>
        <a href="/carmax-maxcare/">CarMax MaxCare</a>
        <a href="/brake-repair/">${es ? 'Frenos' : 'Brake repair'}</a>
        <a href="/check-engine-light/">${es ? 'Luz de check engine' : 'Check engine light'}</a>
        <a href="/engine-repair/">${es ? 'Motor' : 'Engine repair'}</a>
        <a href="/transmission-repair/">${es ? 'Transmisión' : 'Transmission repair'}</a>
        <a href="/suspension-steering/">${es ? 'Suspensión y dirección' : 'Suspension & steering'}</a>
        <a href="/car-battery-electrical/">${es ? 'Batería y eléctrico' : 'Battery & electrical'}</a>
        <a href="/radiator-cooling-system/">${es ? 'Radiador' : 'Radiator & cooling'}</a>
        <a href="/exhaust-muffler/">${es ? 'Mofles y escape' : 'Muffler & exhaust'}</a>
        <a href="/emissions-repair/">${es ? 'Emisiones (VEIP)' : 'Emissions repair'}</a>
        <a href="/car-maintenance/">${es ? 'Mantenimiento' : 'Maintenance & tune-ups'}</a>
        <a href="/ac-repair/">${es ? 'Aire acondicionado' : 'A/C repair'}</a>
        <a href="/tires/">${es ? 'Llantas y alineación' : 'Tires & alignment'}</a>
        <a href="/auto-painting/">${es ? 'Pintura' : 'Auto painting'}</a>
        <a href="/dent-repair/">${es ? 'Abolladuras' : 'Dent repair'}</a>
        <a href="/windshield-glass/">${es ? 'Parabrisas' : 'Windshield & glass'}</a>
        <a href="/fleet-service/">${es ? 'Flotas y empresas' : 'Fleet & work vans'}</a>
      </div>
      <div class="foot-col">
        <div class="foot-title">${es ? 'Empresa' : 'Company'}</div>
        <a href="/#about">${es ? 'Nosotros' : 'About us'}</a>
        <a href="/#reviews">${es ? 'Reseñas' : 'Reviews'}</a>
        <a href="/#faq">FAQ</a>
        <a href="/#contact">${es ? 'Contacto' : 'Contact'}</a>
        ${es ? '<a href="/">English</a>' : '<a href="/es/" hreflang="es" lang="es">Español</a>'}
      </div>
      <div class="foot-col">
        <div class="foot-title">${es ? 'Visítenos' : 'Visit us'}</div>
        <a class="foot-line foot-phone" href="tel:${site.phoneE164}" data-tel>${esc(site.phone)}</a>
        <a class="foot-line" href="${site.googleMapsUrl}" target="_blank" rel="noopener">${esc(site.address.street)}<br>${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}</a>
        <span class="foot-line">${es ? 'Lun – Vie · 8:00 AM – 5:00 PM' : `Mon – Fri · ${site.hours.display}`}</span>
        <span class="foot-line">${es ? 'Sáb – Dom · Cerrado' : 'Sat – Sun · Closed'}</span>
        <span class="foot-line">${es ? 'Buzón de llaves fuera de horario' : 'After-hours key drop'}</span>
      </div>
    </div>
    <div class="foot-areas">${es ? 'Servimos a' : 'Serving'} ${site.serviceArea.join(' · ')} ${es ? 'y el condado de Montgomery, MD' : '& Montgomery County, MD'}</div>
    <div class="foot-bottom">
      <span>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.legalName)}. ${es ? 'Todos los derechos reservados.' : 'All rights reserved.'}</span>
      <span class="foot-legal">${es ? 'CarMax y MaxCare son marcas de CarMax, Inc.' : 'CarMax and MaxCare are trademarks of CarMax, Inc.'}</span>
    </div>
  </div>
</footer>`;
}

function mobileBar(site, lang) {
  const es = lang === 'es';
  return `<div class="mobile-cta" id="mobileCta">
  <a class="btn btn--ghost" href="tel:${site.phoneE164}" data-tel aria-label="${es ? 'Llamar al taller' : 'Call the shop'}">${icon('phone')}${es ? 'Llamar' : 'Call'}</a>
  <a class="btn btn--primary" href="${es ? '/es/#contacto' : '/#contact'}" data-appt>${icon('calendar')}${es ? 'Pedir una cita' : 'Request appointment'}</a>
</div>`;
}

export function layout(site, page, body) {
  const lang = page.lang || 'en';
  return `${head(site, page)}
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
<a class="skip" href="#main">${lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
<div class="scroll-prog" aria-hidden="true"></div>
${sprite}
${utility(site, lang)}
${header(site, lang)}
<main id="main">
${body}
</main>
${mobileBar(site, lang)}
${footer(site, lang)}
<script>window.PM=${JSON.stringify({ formEndpoint: site.formEndpoint, formReady: !!site.web3formsKey, hours: site.hours })};</script>
<script src="/assets/js/main.js?v=${page.buildId}" defer></script>
</body>
</html>
`;
}

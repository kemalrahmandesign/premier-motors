// Section builders shared by the homepage and the service landing pages.
import { esc, icon, addressLine } from './layout.mjs';
import * as C from '../data/content.mjs';

const SVC_LINKS = {"maintenance": [["/oil-change/", "Oil change special"], ["/maryland-state-inspection/", "MD inspection"]], "brakes": [["/brake-repair/", "Brake repair"], ["/tires/", "Alignment"]], "engine": [["/check-engine-light/", "Check engine light"], ["/engine-repair/", "Engine repair"]], "transmission": [["/transmission-repair/", "Transmission repair"]], "tires": [["/tires/", "Tires &amp; alignment"]], "ac": [["/ac-repair/", "A/C repair"]], "towing": []};

const head = ({ eyebrow, title, accent = '', text = '', center = false, light = false, h = 'h2', id = '' }) => `
    <div class="section-head${center ? ' center' : ''}" data-reveal>
      <span class="eyebrow${center ? ' eyebrow--center' : ''}${light ? ' eyebrow--dark' : ''}">${eyebrow}</span>
      <${h} class="split"${accent ? ` data-accent="${accent}"` : ''}${id ? ` id="${id}"` : ''}>${title}</${h}>
      ${text ? `<p>${text}</p>` : ''}
    </div>`;

// Brand panel where a photo goes. With a photo (site.json heroImage / aboutImage) it shows the
// photo under a black-and-gold grade; without one it shows the logo mark on the gold gauge.
export const photoFrame = (src, alt, extraClass = '') => `
      <div class="frame frame--brand frame--photo ${extraClass}">
        <img class="frame-photo" src="${src}" alt="${esc(alt)}" width="1200" height="1500" fetchpriority="high">
        <span class="frame-grade" aria-hidden="true"></span>
        <span class="sweep" aria-hidden="true"></span>
      </div>`;

export const brandFrame = (extraClass = '', photo = '', alt = 'Premier Motors auto repair and body shop in Rockville, MD') =>
  photo ? photoFrame(photo, alt, extraClass) : `
      <div class="frame frame--brand ${extraClass}">
        <svg class="gauge" viewBox="0 0 400 400" aria-hidden="true">
          <defs>
            <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe2b8"/><stop offset=".55" stop-color="#c9ae78"/><stop offset="1" stop-color="#7d6438"/></linearGradient>
          </defs>
          <circle cx="200" cy="200" r="178" fill="none" stroke="rgba(201,174,120,.10)" stroke-width="1"/>
          <circle cx="200" cy="200" r="150" fill="none" stroke="url(#gg)" stroke-width="1.4" stroke-dasharray="2 9" opacity=".55"/>
          <path class="gauge-arc" d="M 74 300 A 160 160 0 1 1 326 300" fill="none" stroke="url(#gg)" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="200" cy="200" r="122" fill="none" stroke="rgba(201,174,120,.16)" stroke-width="1"/>
        </svg>
        <img class="frame-mark" src="/assets/img/logo-mark.png" alt="" width="399" height="254">
        <span class="sweep" aria-hidden="true"></span>
      </div>`;

export function hero(site) {
  return `<section class="hero">
  <div class="wrap">
    <div class="hero-copy">
      <h1 class="eyebrow hero-kicker" data-reveal>Auto Repair &amp; Body Shop in Rockville, MD</h1>
      <p class="hero-title split" data-accent="honest">Premier care. Honest work.</p>
      <p class="hero-lede" data-reveal style="--rd:200ms">Mechanical repair and full body work under one roof, serving Rockville drivers since 2003. All insurance accepted, free estimates, and same-day service on most common jobs.</p>
      <div class="hero-actions" data-reveal style="--rd:300ms">
        <a class="btn btn--primary btn--lg" href="#contact" data-appt>${icon('calendar')}Request an appointment</a>
        <a class="btn btn--ghost btn--lg" href="tel:${site.phoneE164}" data-tel>${icon('phone')}<span>${esc(site.phone)}</span></a>
      </div>
      <div class="hero-points" data-reveal style="--rd:420ms">
        <div class="hero-point"><span class="tick">${icon('check')}</span>12-month / 12,000-mile warranty on parts &amp; labor</div>
        <div class="hero-point"><span class="tick">${icon('check')}</span><span>All insurance &amp; <a class="u-link" href="/carmax-maxcare/">CarMax MaxCare</a> accepted</span></div>
        <div class="hero-point"><span class="tick">${icon('check')}</span>ASE certified · Se habla español</div>
      </div>
      <a class="hero-loc" href="${site.googleMapsUrl}" target="_blank" rel="noopener" data-reveal style="--rd:500ms">${icon('pin')}<span>${esc(addressLine(site))}</span>${icon('arrow-right', 'icon hero-loc-arrow')}</a>
    </div>
    <div class="hero-media" data-reveal="scale" style="--rd:150ms">
      ${brandFrame('', site.heroImage)}
      <div class="hero-est">EST. ${site.founded}</div>
      <div class="hero-badge">
        <div class="badge-ic">${icon('shield')}</div>
        <div><div class="b-title">12 mo / 12,000 mi</div><div class="b-sub">Warranty on parts &amp; labor</div></div>
      </div>
    </div>
  </div>
</section>`;
}

export function stats() {
  const s = [
    ['2003', '', 'Serving Rockville since', false],
    ['30', '+', 'Years of auto repair experience', true],
    ['24', '', 'Years servicing business fleets', true],
    ['12', 'k', 'Mile / 12-month warranty', true],
  ];
  return `<section class="stats" aria-label="Premier Motors at a glance">
  <div class="wrap" data-reveal-group>
    ${s
      .map(
        ([n, suf, lab, count]) => `<div class="stat" data-reveal>
      <div class="num"><span${count ? ` data-count="${n}"` : ''}>${n}</span>${suf ? `<span class="suf">${suf}</span>` : ''}</div>
      <div class="lab">${lab}</div>
    </div>`,
      )
      .join('\n    ')}
  </div>
</section>`;
}

export function specialCard(site, sp, lang = 'en', i = 0) {
  const es = lang === 'es';
  const [d, c] = sp.price.split('.');
  return `<article class="special" data-reveal style="--rd:${i * 120}ms">
      <div class="special-top">
        <span class="special-save">${esc(es ? sp.saveEs : sp.save)}</span>
        <span class="special-tag">${icon('tag')}${es ? 'Especial' : 'Special'}</span>
      </div>
      <h3>${esc(es ? sp.titleEs : sp.title)}</h3>
      <p class="special-detail">${esc(es ? sp.detailEs : sp.detail)}</p>
      <div class="special-price" aria-label="${es ? 'Precio especial' : 'Special price'} $${sp.price}, ${es ? 'precio regular' : 'regular price'} $${sp.regular}">
        <span class="amt"><sup>$</sup>${d}${c ? `<sup>.${c}</sup>` : ''}</span>
        <span class="reg">${es ? 'Reg.' : 'Reg.'} <s>$${esc(sp.regular)}</s></span>
      </div>
      <div class="special-actions">
        <a class="btn btn--primary" href="${es ? '#contacto' : '/#contact'}" data-appt data-service="Specials" data-special="${esc(sp.title)}">${icon('calendar')}${es ? 'Reservar este especial' : 'Book this special'}</a>
        <a class="btn btn--ghost" href="tel:${site.phoneE164}" data-tel>${icon('phone')}${es ? 'Llamar' : 'Call'}</a>
      </div>
    </article>`;
}

export function specials(site, lang = 'en') {
  const es = lang === 'es';
  return `<section class="section specials" id="${es ? 'especiales' : 'specials'}">
  <div class="wrap">
    ${head(
      es
        ? { eyebrow: 'Especiales de temporada', title: 'Especiales que valen la visita.', accent: 'especiales', center: true }
        : { eyebrow: 'Current specials', title: 'Specials worth the drive.', accent: 'specials', center: true, text: 'Two of our most popular services at prices that make it easy to come in.' },
    )}
    <div class="special-grid">
    ${site.specials.map((sp, i) => specialCard(site, sp, lang, i)).join('\n    ')}
    </div>
    <p class="specials-note" data-reveal>${esc(es ? site.specialsNoteEs : site.specialsNote)}</p>
  </div>
</section>`;
}

export function insuranceCards(site, lang = 'en') {
  const es = lang === 'es';
  const cards = es
    ? [
        { title: 'Aceptamos todos los seguros', lines: ['Trabajamos con todas las compañías de seguros.'], strong: 'Ahorre en su deducible: hasta $500.' },
        { title: 'CarMax MaxCare', lines: ['Aceptamos toda la cobertura de CarMax MaxCare.'], strong: 'Ahorre en su deducible.' },
      ]
    : C.insurance;
  return cards
    .map(
      (c, i) => `<div class="ins-card${i === 0 ? ' ins-card--gold' : ''}" data-reveal style="--rd:${i * 120}ms">
        <div class="ins-ic">${icon(i === 0 ? 'shield' : 'badge')}</div>
        <h3>${esc(c.title)}</h3>
        ${c.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
        <p class="ins-strong">${esc(c.strong)}</p>
        <a class="ins-call" href="tel:${site.phoneE164}" data-tel>${icon('phone')}${es ? 'Llame para más detalles.' : 'Call for details.'}</a>
        ${i === 1 && !es ? `<a class="ins-more" href="/carmax-maxcare/">MaxCare repairs at Premier ${icon('arrow-right')}</a>` : ''}
      </div>`,
    )
    .join('\n      ');
}

export function bodyWork(site, { h = 'h2', withLink = true } = {}) {
  return `<section class="section bodywork" id="body-work">
  <div class="wrap">
    <div class="bw-copy">
      ${head({ eyebrow: 'Body shop &amp; insurance claims', title: 'Collision repair that saves you on your deductible.', accent: 'deductible', h, text: 'Body work is one of the things we’re best known for. From fender benders to major collision damage, our body shop handles the repair and works with your insurance company, so you can get back on the road.' })}
      <ul class="bw-list">
        ${C.bodyWork
          .map(
            (b, i) => `<li data-reveal style="--rd:${i * 80}ms"><span class="bw-ic">${icon(b.icon)}</span><div><h3><a href="${{ collision: '/body-shop/', dent: '/dent-repair/', paint: '/auto-painting/', glass: '/windshield-glass/' }[b.icon]}">${b.title}</a></h3><p>${b.text}</p></div></li>`,
          )
          .join('\n        ')}
      </ul>
      <div class="hero-actions" data-reveal>
        <a class="btn btn--primary btn--lg" href="/#contact" data-appt data-service="Body work / insurance claim">${icon('doc')}Get a free estimate</a>
        <a class="btn btn--ghost btn--lg" href="tel:${site.phoneE164}" data-tel>${icon('phone')}<span>${esc(site.phone)}</span></a>
      </div>
      ${withLink ? `<a class="text-link" href="/body-shop/" data-reveal>More about our body shop ${icon('arrow-right')}</a>` : ''}
    </div>
    <div class="ins-stack">
      ${insuranceCards(site)}
    </div>
  </div>
</section>`;
}

export function why() {
  return `<section class="section why light" id="why">
  <div class="wrap">
    ${head({ eyebrow: 'Why Premier Motors', title: 'Experience you can count on. Honesty you can feel.', accent: 'honesty', light: true, text: 'Over 30 years in auto repair and more than two decades in Rockville. Here’s what that means when you bring your car to us.' })}
    <div class="why-grid">
      ${C.trust
        .map(
          (t, i) => `<div class="why-card" data-reveal style="--rd:${(i % 4) * 90}ms"><div class="why-big">${t.big}</div><h3>${t.label}</h3><p>${t.text}</p></div>`,
        )
        .join('\n      ')}
    </div>
    <div class="perk-grid">
      ${C.trustBadges
        .map((b, i) => `<div class="perk" data-reveal style="--rd:${(i % 5) * 70}ms"><div class="perk-ic">${icon(b.icon)}</div><h3>${b.label}</h3></div>`)
        .join('\n      ')}
    </div>
  </div>
</section>`;
}

export function services({ full = false, h = 'h2' } = {}) {
  return `<section class="section services" id="services">
  <div class="wrap">
    ${head({ eyebrow: 'Mechanical repair', title: 'Complete car care, under one roof.', accent: 'complete', h, text: 'Free estimates. Same-day service on most common jobs. From routine maintenance to major engine and transmission work, our team handles it all.' })}
    <div class="svc-grid">
      ${C.serviceGroups
        .map(
          (g, i) => `<article class="svc-card${g.id === 'towing' ? ' svc-card--note' : ''}" id="svc-${g.id}" data-reveal style="--rd:${(i % 3) * 90}ms">
        <div class="svc-ic">${icon(g.icon)}</div>
        <h3>${g.title}</h3>
        <ul>${g.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
        ${(SVC_LINKS[g.id] || []).length ? `<div class="svc-links">${SVC_LINKS[g.id].map(([h, l]) => `<a href="${h}">${l}${icon('arrow-right')}</a>`).join('')}</div>` : ''}
      </article>`,
        )
        .join('\n      ')}
    </div>
    <div class="svc-foot" data-reveal>
      <a class="btn btn--primary" href="/#contact" data-appt>${icon('calendar')}Request an appointment</a>
      ${full ? '' : `<a class="text-link" href="/auto-repair/">See all repair services ${icon('arrow-right')}</a>`}
    </div>
  </div>
</section>`;
}

export function vehicles() {
  return `<section class="section vehicles" id="vehicles">
  <div class="wrap">
    ${head({ eyebrow: 'Vehicles we service', title: 'Domestic, Asian &amp; European. Cars, trucks &amp; vans.', accent: 'vans', text: 'We service most American, Japanese, Korean and European cars, trucks, SUVs and work vans.' })}
    <div class="veh-cols">
      ${C.vehicles
        .map(
          (v, i) => `<div class="veh-col" data-reveal style="--rd:${i * 90}ms">
        <h3>${v.title}<span>${v.text}</span></h3>
        ${v.makes.length ? `<div class="veh-tags">${v.makes.map((m) => `<span class="veh-tag">${m}</span>`).join('')}</div>` : '<p class="veh-note">Most European makes. Call to confirm your model.</p>'}
      </div>`,
        )
        .join('\n      ')}
    </div>
    <div class="veh-types" data-reveal>
      ${C.vehicleTypes.map((t) => `<span class="veh-type">${icon(t.startsWith('Work') ? 'van' : 'car')}${esc(t)}</span>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function reviews(site) {
  const widget = site.reviewsWidgetHtml
    ? `<div class="rev-widget" data-reveal>${site.reviewsWidgetHtml}</div>`
    : '';
  return `<section class="section reviews light" id="reviews">
  <div class="wrap">
    ${head({ eyebrow: 'Reviews', title: 'Hear it from our customers.', accent: 'customers', center: true, light: true, text: 'Real reviews from Rockville drivers, straight from Google.' })}
    ${widget}
    <div class="rev-cta" data-reveal>
      <div class="rev-g">${icon('google')}</div>
      <div class="rev-copy">
        <h3>See our reviews on Google</h3>
        <p>Read what customers say about Premier Motors, or share your own experience. Your review helps neighbors find an honest shop.</p>
      </div>
      <div class="rev-actions">
        <a class="btn btn--dark" href="${site.googleMapsUrl}" target="_blank" rel="noopener">${icon('star')}Read our Google reviews</a>
        ${site.googleReviewUrl ? `<a class="btn btn--outline-dark" href="${esc(site.googleReviewUrl)}" target="_blank" rel="noopener">Leave a review</a>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

export function about(site = {}) {
  return `<section class="section about" id="about">
  <div class="wrap">
    <div class="about-media" data-reveal="left">
      ${site.aboutImage ? photoFrame(site.aboutImage, 'Inside the Premier Motors shop in Rockville, MD', 'frame--about') : `<div class="frame frame--brand frame--about">
        <img class="frame-logo" src="/assets/img/logo-full.webp" alt="Premier Motors LLC logo" width="1098" height="533" loading="lazy">
        <span class="sweep" aria-hidden="true"></span>
      </div>`}
      <div class="about-tag"><span>${icon('wrench')}</span>Team of five · One roof</div>
    </div>
    <div class="about-copy">
      ${head({ eyebrow: 'About Premier Motors', title: 'Rockville’s shop for service and honesty.', accent: 'honesty' })}
      ${C.about.map((p, i) => `<p data-reveal style="--rd:${i * 100}ms">${esc(p)}</p>`).join('\n      ')}
      <div class="exp-grid">
        ${C.experience.map(([t, d], i) => `<div class="exp" data-reveal style="--rd:${(i % 2) * 80}ms">${icon('check')}<div><strong>${t}</strong><span>${d}</span></div></div>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>`;
}

export function fleet(site) {
  return `<section class="section section--tight fleet" id="fleet">
  <div class="wrap">
    <div class="fleet-card" data-reveal>
      <div class="fleet-ic">${icon('van')}</div>
      <div class="fleet-copy">
        <span class="eyebrow">Fleet &amp; business vehicles</span>
        <h2>24 years keeping work vehicles on the road.</h2>
        <p>With 24 years of fleet experience, we know how to keep work vehicles running and on schedule. Contractors, delivery vans, company cars: call us to set up service for your business.</p>
      </div>
      <a class="btn btn--primary btn--lg" href="tel:${site.phoneE164}" data-tel>${icon('phone')}<span>Call ${esc(site.phone)}</span></a>
    </div>
  </div>
</section>`;
}

export function faqList(items) {
  return `<div class="faq-list">
      ${items
        .map(
          ([q, a]) => `<details class="faq-item" data-reveal>
        <summary>${esc(q)}${icon('chevron')}</summary>
        <p>${esc(a)}</p>
      </details>`,
        )
        .join('\n      ')}
    </div>`;
}

export function faq(items = C.faq, title = 'Frequently asked questions.') {
  return `<section class="section faq" id="faq">
  <div class="wrap">
    ${head({ eyebrow: 'FAQ', title, center: true })}
    ${faqList(items)}
  </div>
</section>`;
}

export function areas(site) {
  return `<section class="section section--tight areas" id="areas">
  <div class="wrap">
    ${head({ eyebrow: 'Areas we serve', title: 'Proudly serving Rockville &amp; Montgomery County.', center: true })}
    <div class="area-tags">
      ${site.serviceArea.map((a, i) => `<span class="area-tag" data-reveal style="--rd:${(i % 4) * 70}ms">${icon('pin')}${a}</span>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

const t = (lang, en, es) => (lang === 'es' ? es : en);

export function contact(site, lang = 'en') {
  const es = lang === 'es';
  const opts = C.formServices
    .map((s) => {
      const label = es
        ? {
            Specials: 'Especiales',
            'Body work / insurance claim': 'Carrocería / reclamo de seguro',
            'CarMax MaxCare': 'CarMax MaxCare',
            Maintenance: 'Mantenimiento',
            Brakes: 'Frenos',
            'Engine / check engine light': 'Motor / luz de check engine',
            Transmission: 'Transmisión',
            'A/C': 'Aire acondicionado',
            Tires: 'Llantas',
            Other: 'Otro',
          }[s]
        : s;
      return `<option value="${esc(s)}">${esc(label)}</option>`;
    })
    .join('');
  return `<section class="section contact" id="${es ? 'contacto' : 'contact'}">
  <div class="wrap">
    <div>
      ${head({
        eyebrow: t(lang, 'Request an appointment', 'Pida una cita'),
        title: t(lang, 'Tell us about your vehicle.', 'Cuéntenos sobre su vehículo.'),
        accent: t(lang, 'vehicle', 'vehículo'),
        text: t(
          lang,
          'Send a request and we’ll call you back to confirm a time. Prefer to talk? Call us at ' + site.phone + '. Walk-ins are welcome too.',
          'Envíe su solicitud y le llamaremos para confirmar la hora. ¿Prefiere hablar? Llámenos al ' + site.phone + '. También atendemos sin cita.',
        ),
      })}
      <!-- Booking form -> Web3Forms (https://web3forms.com), which emails each request to the shop's inbox.
           The access key comes from web3formsKey in src/data/site.json. -->
      <form class="book-form" id="bookForm" action="${esc(site.formEndpoint)}" method="POST" novalidate data-lang="${lang}" data-endpoint="${esc(site.formEndpoint)}">
        <input type="hidden" name="access_key" value="${esc(site.web3formsKey || '')}">
        <input type="hidden" name="subject" value="${es ? 'Nueva solicitud de cita (español): Premier Motors' : 'New appointment request: Premier Motors website'}">
        <input type="hidden" name="from_name" value="Premier Motors website">
        <input type="hidden" name="language" value="${es ? 'Spanish' : 'English'}">
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="field-row">
          <div class="field"><label for="fName">${t(lang, 'Name', 'Nombre')} <em>*</em></label><input id="fName" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="fPhone">${t(lang, 'Phone', 'Teléfono')} <em>*</em></label><input id="fPhone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="fEmail">Email</label><input id="fEmail" name="email" type="email" autocomplete="email"></div>
          <div class="field"><label for="fVehicle">${t(lang, 'Vehicle year / make / model', 'Año / marca / modelo')}</label><input id="fVehicle" name="vehicle" type="text" placeholder="${t(lang, 'e.g. 2016 Honda Accord', 'ej. 2016 Honda Accord')}"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="fService">${t(lang, 'Service needed', 'Servicio')}</label><select id="fService" name="service"><option value="">${t(lang, 'Choose a service', 'Elija un servicio')}</option>${opts}</select></div>
          <div class="field"><label for="fDate">${t(lang, 'Preferred date (optional)', 'Fecha preferida (opcional)')}</label><input id="fDate" name="preferred_date" type="date"></div>
        </div>
        <div class="field"><label for="fMsg">${t(lang, 'Message', 'Mensaje')}</label><textarea id="fMsg" name="message" rows="4" placeholder="${t(lang, 'What’s going on with your vehicle?', '¿Qué le pasa a su vehículo?')}"></textarea></div>
        <button class="btn btn--primary btn--lg btn--block" type="submit">${icon('mail')}${t(lang, 'Send request', 'Enviar solicitud')}</button>
        <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>
        <p class="form-fine">${t(lang, 'We’ll call to confirm. Requests are not confirmed appointments until we do.', 'Le llamaremos para confirmar. La solicitud no es una cita confirmada hasta entonces.')}</p>
      </form>
    </div>
    <div class="book-info" data-reveal style="--rd:120ms">
      <div class="info-card info-card--call">
        <h3>${t(lang, 'Call the shop', 'Llame al taller')}</h3>
        <a class="big-phone" href="tel:${site.phoneE164}" data-tel>${esc(site.phone)}</a>
        <p>${t(lang, 'Se habla español · Free estimates', 'Se habla español · Presupuestos gratis')}</p>
      </div>
      <div class="info-card">
        <h3>${t(lang, 'Hours', 'Horario')}</h3>
        <div class="hours-row"><span class="day">${t(lang, 'Monday – Friday', 'Lunes – Viernes')}</span><span class="time">${site.hours.display}</span></div>
        <div class="hours-row closed"><span class="day">${t(lang, 'Saturday – Sunday', 'Sábado – Domingo')}</span><span class="time">${t(lang, 'Closed', 'Cerrado')}</span></div>
        <div class="hours-note">${icon('key')}${t(lang, 'After-hours key drop available', 'Buzón de llaves disponible fuera de horario')}</div>
        <div class="hours-live" data-open-status data-lang="${lang}"></div>
      </div>
      <div class="info-card">
        <h3>${t(lang, 'Visit us', 'Visítenos')}</h3>
        <div class="info-line">${icon('pin')}<div class="it"><strong>${esc(site.address.street)}</strong><span>${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)} · ${t(lang, 'Unit G office', 'Oficina de la Unidad G')}</span></div></div>
        <div class="info-line">${icon('cash')}<div class="it"><strong>${t(lang, 'Payment', 'Pago')}</strong><span>${t(lang, 'All major credit cards and cash', 'Todas las tarjetas de crédito principales y efectivo')}</span></div></div>
        <div class="map">
          <iframe title="${t(lang, 'Map to Premier Motors', 'Mapa a Premier Motors')}" src="${esc(site.mapEmbedUrl)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a class="text-link" href="${site.googleMapsUrl}" target="_blank" rel="noopener">${t(lang, 'Get directions', 'Cómo llegar')} ${icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>`;
}

// Hero for inner landing pages.
export function pageHero({ crumbs, h1, lede, kicker, actions = '', side = '' }) {
  return `<section class="hero hero--page">
  <div class="wrap">
    <div class="hero-copy">
      <nav class="crumbs" aria-label="Breadcrumb" data-reveal>${crumbs
        .map(([href, label], i) => (i < crumbs.length - 1 ? `<a href="${href}">${label}</a><span>/</span>` : `<span aria-current="page">${label}</span>`))
        .join('')}</nav>
      <span class="eyebrow" data-reveal>${kicker}</span>
      <h1 class="hero-title split">${h1}</h1>
      <p class="hero-lede" data-reveal style="--rd:200ms">${lede}</p>
      <div class="hero-actions" data-reveal style="--rd:300ms">${actions}</div>
    </div>
    ${side ? `<div class="hero-side" data-reveal="scale" style="--rd:150ms">${side}</div>` : ''}
  </div>
</section>`;
}

export { head as sectionHead };

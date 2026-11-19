// Page definitions. Each page: path, SEO meta, structured data, body HTML.
import * as X from './templates/components.mjs';
import { esc, icon, ctaBand } from './templates/layout.mjs';
import * as S from './schema.mjs';
import { faq as FAQ, bodyWork as BW } from './data/content.mjs';

const pick = (...qs) => FAQ.filter(([q]) => qs.some((s) => q.startsWith(s)));
const callBtn = (site, cls = 'btn btn--ghost btn--lg') => `<a class="${cls}" href="tel:${site.phoneE164}" data-tel>${icon('phone')}<span>${esc(site.phone)}</span></a>`;
const apptBtn = (label = 'Request an appointment', service = '') =>
  `<a class="btn btn--primary btn--lg" href="/#contact" data-appt${service ? ` data-service="${service}"` : ''}>${icon('calendar')}${label}</a>`;

const prose = (blocks) => `<section class="section section--tight prose-sec">
  <div class="wrap prose-grid">
    ${blocks
      .map(
        (b, i) => `<div class="prose-card" data-reveal style="--rd:${(i % 3) * 90}ms">
      <div class="svc-ic">${icon(b.icon)}</div>
      <h2>${b.title}</h2>
      ${b.paras.map((p) => `<p>${p}</p>`).join('')}
    </div>`,
      )
      .join('\n    ')}
  </div>
</section>`;

export default function pages(site) {
  const biz = S.business(site);
  const insFaq = pick('Do you work with my insurance', 'Do you accept CarMax', 'Do you give free', 'What warranty');

  return [
    // ---------------------------------------------------------------- Home
    {
      path: '/',
      out: 'index.html',
      title: 'Premier Motors | Auto Repair & Body Shop in Rockville, MD',
      description:
        'Auto repair and body work in Rockville, MD since 2003. Specials on oil changes and MD state inspection. All insurance accepted. Save on your deductible. Call (301) 340-2130.',
      alternates: [['en', '/'], ['es', '/es/'], ['x-default', '/']],
      priority: '1.0',
      schema: [biz, S.website(site), S.faqPage()],
      body: [
        X.hero(site),
        X.stats(),
        X.specials(site),
        X.bodyWork(site),
        X.why(),
        X.services(),
        X.vehicles(),
        X.reviews(site),
        X.about(site),
        X.fleet(site),
        X.faq(),
        X.areas(site),
        X.contact(site),
        ctaBand(site),
      ].join('\n\n'),
    },

    // ---------------------------------------------------------------- Body shop
    {
      path: '/body-shop/',
      out: 'body-shop/index.html',
      title: 'Body Shop & Collision Repair in Rockville, MD | Premier Motors',
      description:
        'Body shop in Rockville, MD: collision, dent repair, painting and glass. All insurance and CarMax MaxCare accepted. Save on your deductible. Call for details.',
      priority: '0.9',
      schema: [
        biz,
        S.service(site, {
          name: 'Body Shop & Collision Repair',
          serviceType: 'Auto body and collision repair',
          description: 'Body work and collision repair, dent repair, auto painting, and windshield and glass replacement. All insurance companies accepted.',
          path: '/body-shop/',
        }),
        S.breadcrumbs(site, [['/', 'Home'], ['/body-shop/', 'Body Shop']]),
        S.faqPage(insFaq),
      ],
      body: [
        X.pageHero({
          crumbs: [['/', 'Home'], ['', 'Body Shop']],
          kicker: 'Body shop · Rockville, MD',
          h1: 'Body Shop &amp; Collision Repair in Rockville, MD',
          lede: 'Collision repair, dent repair, auto painting and glass, done right under the same roof as our mechanical shop. We work with all insurance companies and accept all CarMax MaxCare coverage.',
          actions: apptBtn('Get a free estimate', 'Body work / insurance claim') + callBtn(site),
          side: `<div class="ins-stack">${X.insuranceCards(site)}</div>`,
        }),
        prose(BW.map((b) => ({ icon: b.icon, title: b.title, paras: [b.text] }))),
        `<section class="section steps-sec light">
  <div class="wrap">
    ${X.sectionHead({ eyebrow: 'How it works', title: 'From damage to done.', light: true, center: true })}
    <ol class="steps">
      <li data-reveal><span class="step-n">01</span><h3>Free estimate</h3><p>Call or stop by. We’ll look at the damage and give you a free estimate.</p></li>
      <li data-reveal style="--rd:90ms"><span class="step-n">02</span><h3>Your insurance</h3><p>We work with all insurance companies and accept all CarMax MaxCare coverage. Ask how you can save on your deductible.</p></li>
      <li data-reveal style="--rd:180ms"><span class="step-n">03</span><h3>Back on the road</h3><p>Your repair is backed by our 12-month / 12,000-mile warranty on parts and labor.</p></li>
    </ol>
  </div>
</section>`,
        X.faq(insFaq, 'Body shop &amp; insurance questions.'),
        ctaBand(site),
      ].join('\n\n'),
    },

    // ---------------------------------------------------------------- Auto repair
    {
      path: '/auto-repair/',
      out: 'auto-repair/index.html',
      title: 'Auto Repair in Rockville, MD | Premier Motors',
      description:
        'Auto repair in Rockville, MD: brakes, check engine light, engine, transmission, A/C, tires and maintenance. Free estimates. Call (301) 340-2130.',
      priority: '0.9',
      schema: [
        biz,
        S.service(site, {
          name: 'Auto Repair',
          serviceType: 'Automotive repair and maintenance',
          description: 'Maintenance, brakes, suspension and steering, tires, engine diagnostics and repair, electrical, transmission, drivetrain, exhaust, emissions repair, heating and A/C, and towing.',
          path: '/auto-repair/',
        }),
        S.breadcrumbs(site, [['/', 'Home'], ['/auto-repair/', 'Auto Repair']]),
      ],
      body: [
        X.pageHero({
          crumbs: [['/', 'Home'], ['', 'Auto Repair']],
          kicker: 'Mechanical repair · Rockville, MD',
          h1: 'Auto Repair Services in Rockville, MD',
          lede: 'From oil changes and brakes to check engine lights, engine work and transmissions, our team handles it all. Free estimates and same-day service on most common jobs.',
          actions: apptBtn() + callBtn(site),
          side: `<div class="mini-stats">
            <div><b>30+</b><span>Years of auto repair experience</span></div>
            <div><b>12/12</b><span>Month / mile warranty, parts &amp; labor</span></div>
            <div><b>Free</b><span>Estimates on every job</span></div>
            <div><b>Same day</b><span>On most common jobs</span></div>
          </div>`,
        }),
        X.services({ full: true }),
        X.vehicles(),
        X.why(),
        X.faq(pick('Do I need', 'How long', 'What parts', 'What vehicles', 'Do you offer towing', 'What warranty')),
        ctaBand(site),
      ].join('\n\n'),
    },

    // ---------------------------------------------------------------- MD inspection
    (() => {
      const sp = site.specials.find((s) => s.id === 'inspection');
      const f = [
        ['How much is a Maryland State Safety Inspection at Premier Motors?', `Our current special is $${sp.price} (regular $${sp.regular}). Specials are subject to change, so call ${site.phone} to confirm.`],
        ['Do I need an appointment for a state inspection?', 'Appointments and walk-ins are both welcome. You can request a time online or call us.'],
        ['What if my car doesn’t pass?', 'We’re a full-service repair shop, so we can take care of the repairs your vehicle needs, with a free estimate before we start.'],
        ['Do you handle emissions (VEIP) repairs?', 'Yes. We do emissions repair to help your vehicle pass VEIP.'],
      ];
      return {
        path: '/maryland-state-inspection/',
        out: 'maryland-state-inspection/index.html',
        title: `MD State Inspection in Rockville: $${sp.price} | Premier Motors`,
        description: `Maryland State Safety Inspection in Rockville, MD for $${sp.price} (reg. $${sp.regular}). Walk-ins welcome, repairs done in-house. Call (301) 340-2130.`,
        priority: '0.9',
        schema: [
          biz,
          S.service(site, {
            name: 'Maryland State Safety Inspection',
            serviceType: 'Vehicle safety inspection',
            description: 'Maryland State Safety Inspection with in-house repairs if your vehicle needs work to pass.',
            path: '/maryland-state-inspection/',
            offer: sp,
          }),
          S.breadcrumbs(site, [['/', 'Home'], ['/maryland-state-inspection/', 'Maryland State Inspection']]),
          S.faqPage(f),
        ],
        body: [
          X.pageHero({
            crumbs: [['/', 'Home'], ['', 'MD State Inspection']],
            kicker: 'Maryland State Safety Inspection',
            h1: 'Maryland State Inspection in Rockville, MD',
            lede: 'Buying a used car or registering a vehicle in Maryland? Get your Maryland State Safety Inspection done at Premier Motors, and if anything needs fixing to pass, our shop can handle it.',
            actions: apptBtn('Book your inspection', 'Specials') + callBtn(site),
            side: `<div class="special-solo">${X.specialCard(site, sp)}<p class="specials-note">${esc(site.specialsNote)}</p></div>`,
          }),
          prose([
            { icon: 'clipboard', title: 'When you need one', paras: ['In Maryland, a used vehicle generally needs to pass a state safety inspection before it can be titled and registered after a sale or transfer, or when you bring a vehicle in from out of state.'] },
            { icon: 'wrench', title: 'Repairs under one roof', paras: ['If your vehicle needs work to pass, we’re a full-service shop: brakes, suspension, steering, lights, tires, glass and more, with free estimates.'] },
            { icon: 'engine', title: 'Emissions repair (VEIP)', paras: ['Emissions testing (VEIP) is a separate program. If your vehicle needs emissions repair to pass VEIP, we can help with that too.'] },
          ]),
          X.faq(f, 'State inspection questions.'),
          ctaBand(site),
        ].join('\n\n'),
      };
    })(),

    // ---------------------------------------------------------------- Oil change
    (() => {
      const sp = site.specials.find((s) => s.id === 'oil');
      const f = [
        ['What’s included in the oil change special?', `An oil change with up to 5 quarts of full synthetic oil, a new oil filter and a tire rotation for $${sp.price} (regular $${sp.regular}). Specials are subject to change. Call for details.`],
        ['Do you do conventional oil changes too?', 'Yes. We do conventional and synthetic oil changes, plus scheduled maintenance at 30k, 60k and 90k miles.'],
        ['Do I need an appointment?', 'Appointments and walk-ins are both welcome. Most oil changes are done the same day.'],
      ];
      return {
        path: '/oil-change/',
        out: 'oil-change/index.html',
        title: `$${sp.price} Oil Change Special in Rockville, MD | Premier Motors`,
        description: `$${sp.price} oil change special in Rockville, MD: up to 5 qt full synthetic, new filter and tire rotation (reg. $${sp.regular}). Walk-ins welcome. Call (301) 340-2130.`,
        priority: '0.8',
        schema: [
          biz,
          S.service(site, {
            name: 'Oil Change + Filter + Tire Rotation',
            serviceType: 'Oil change',
            description: 'Oil change with up to 5 quarts of full synthetic oil, new filter and tire rotation.',
            path: '/oil-change/',
            offer: sp,
          }),
          S.breadcrumbs(site, [['/', 'Home'], ['/oil-change/', 'Oil Change Special']]),
          S.faqPage(f),
        ],
        body: [
          X.pageHero({
            crumbs: [['/', 'Home'], ['', 'Oil Change Special']],
            kicker: 'Oil change special · Rockville, MD',
            h1: 'Oil Change Special in Rockville, MD',
            lede: 'Full synthetic oil change, new filter and a tire rotation in one visit. It’s the easiest way to keep your engine healthy and your tires wearing evenly.',
            actions: apptBtn('Book this special', 'Specials') + callBtn(site),
            side: `<div class="special-solo">${X.specialCard(site, sp)}<p class="specials-note">${esc(site.specialsNote)}</p></div>`,
          }),
          prose([
            { icon: 'oil', title: 'Full synthetic oil', paras: ['Up to 5 quarts of full synthetic oil and a new oil filter.'] },
            { icon: 'tire', title: 'Tire rotation included', paras: ['We rotate your tires in the same visit to help them wear evenly and last longer.'] },
            { icon: 'clipboard', title: 'Scheduled maintenance', paras: ['Coming up on 30k, 60k or 90k miles? We handle scheduled maintenance, fluids, filters, belts and tune-ups too.'] },
          ]),
          X.faq(f, 'Oil change questions.'),
          ctaBand(site),
        ].join('\n\n'),
      };
    })(),

    // ---------------------------------------------------------------- Spanish
    {
      path: '/es/',
      out: 'es/index.html',
      lang: 'es',
      title: 'Taller Mecánico y de Carrocería en Rockville, MD | Premier Motors',
      description:
        'Taller mecánico y de carrocería en Rockville, MD desde 2003. Se habla español. Aceptamos todos los seguros. Ahorre en su deducible. Llame al (301) 340-2130.',
      alternates: [['en', '/'], ['es', '/es/'], ['x-default', '/']],
      priority: '0.8',
      schema: [biz],
      body: [
        `<section class="hero">
  <div class="wrap">
    <div class="hero-copy">
      <h1 class="eyebrow hero-kicker" data-reveal>Taller mecánico y de carrocería en Rockville, MD</h1>
      <p class="hero-title split" data-accent="honesto">Servicio premier. Trabajo honesto.</p>
      <p class="hero-lede" data-reveal style="--rd:200ms">Reparación mecánica y carrocería bajo un mismo techo, sirviendo a Rockville desde 2003. Aceptamos todos los seguros, presupuestos gratis y servicio el mismo día en la mayoría de los trabajos comunes. <strong>Se habla español.</strong></p>
      <div class="hero-actions" data-reveal style="--rd:300ms">
        <a class="btn btn--primary btn--lg" href="#contacto" data-appt>${icon('calendar')}Pedir una cita</a>
        ${callBtn(site)}
      </div>
      <div class="hero-points" data-reveal style="--rd:420ms">
        <div class="hero-point"><span class="tick">${icon('check')}</span>Garantía de 12 meses / 12,000 millas en piezas y mano de obra</div>
        <div class="hero-point"><span class="tick">${icon('check')}</span>Aceptamos todos los seguros y CarMax MaxCare</div>
        <div class="hero-point"><span class="tick">${icon('check')}</span>Más de 30 años de experiencia</div>
      </div>
    </div>
    <div class="hero-media" data-reveal="scale" style="--rd:150ms">
      ${X.brandFrame('', site.heroImage)}
      <div class="hero-est">DESDE ${site.founded}</div>
      <div class="hero-badge"><div class="badge-ic">${icon('globe')}</div><div><div class="b-title">Se habla español</div><div class="b-sub">Llámenos con confianza</div></div></div>
    </div>
  </div>
</section>`,
        X.specials(site, 'es'),
        `<section class="section bodywork" id="carroceria">
  <div class="wrap">
    <div class="bw-copy">
      ${X.sectionHead({ eyebrow: 'Carrocería y seguros', title: 'Reparación de colisiones y ahorro en su deducible.', accent: 'deducible', text: 'Reparación de carrocería y colisiones, reparación de abolladuras, pintura y parabrisas. Trabajamos con su compañía de seguros.' })}
      <ul class="bw-list">
        <li data-reveal><span class="bw-ic">${icon('collision')}</span><div><h3>Carrocería y colisiones</h3><p>Desde golpes pequeños hasta daños mayores.</p></div></li>
        <li data-reveal><span class="bw-ic">${icon('dent')}</span><div><h3>Reparación de abolladuras</h3><p>Golpes de puertas, granizo y estacionamiento.</p></div></li>
        <li data-reveal><span class="bw-ic">${icon('paint')}</span><div><h3>Pintura automotriz</h3><p>Pintura a juego con su vehículo.</p></div></li>
        <li data-reveal><span class="bw-ic">${icon('glass')}</span><div><h3>Parabrisas y vidrios</h3><p>Reemplazo de parabrisas y vidrios rotos.</p></div></li>
      </ul>
      <div class="hero-actions" data-reveal>
        <a class="btn btn--primary btn--lg" href="#contacto" data-appt data-service="Body work / insurance claim">${icon('doc')}Presupuesto gratis</a>
        ${callBtn(site)}
      </div>
    </div>
    <div class="ins-stack">${X.insuranceCards(site, 'es')}</div>
  </div>
</section>`,
        `<section class="section services" id="servicios">
  <div class="wrap">
    ${X.sectionHead({ eyebrow: 'Reparación mecánica', title: 'Todo para su auto, bajo un mismo techo.', accent: 'todo', text: 'Presupuestos gratis. Servicio el mismo día en la mayoría de los trabajos comunes.' })}
    <div class="svc-grid">
      ${[
        ['oil', 'Mantenimiento', ['Cambios de aceite (convencional y sintético)', 'Mantenimiento programado (30k / 60k / 90k)', 'Líquidos y filtros', 'Afinaciones: bujías y bobinas', 'Bandas y mangueras', 'Inspección de seguridad del estado de Maryland']],
        ['brake', 'Frenos, suspensión y dirección', ['Pastillas y rotores', 'Calipers, líneas y ABS', 'Amortiguadores y struts', 'Alineación', 'Baleros y flechas (CV)']],
        ['engine', 'Motor, diagnóstico y eléctrico', ['Diagnóstico de luz de check engine', 'Reparación y reemplazo de motor', 'Sistema de enfriamiento', 'Batería, alternador y marcha', 'Sistema eléctrico y de combustible']],
        ['gear', 'Transmisión, tracción y escape', ['Servicio, reparación y reemplazo de transmisión', 'Clutch', 'Diferencial, 4x4 y AWD', 'Escape, mofles y catalizadores', 'Reparación de emisiones (VEIP)']],
        ['tire', 'Llantas', ['Venta de llantas', 'Montaje y balanceo', 'Rotación de llantas']],
        ['snow', 'Calefacción y A/C', ['Recarga y reparación de A/C', 'Calefacción y motor del ventilador', 'Servicio de grúa disponible']],
      ]
        .map(
          ([ic, title, items], i) => `<article class="svc-card" data-reveal style="--rd:${(i % 3) * 90}ms"><div class="svc-ic">${icon(ic)}</div><h3>${title}</h3><ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul></article>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`,
        X.contact(site, 'es'),
        ctaBand(site, 'es'),
      ].join('\n\n'),
    },

    // ---------------------------------------------------------------- 404
    {
      path: '/404.html',
      out: '404.html',
      noindex: true,
      sitemap: false,
      title: 'Page not found | Premier Motors',
      description: 'This page could not be found.',
      schema: [],
      body: X.pageHero({
        crumbs: [['/', 'Home'], ['', 'Not found']],
        kicker: 'Error 404',
        h1: 'This page took a wrong turn.',
        lede: 'The page you’re looking for isn’t here. Head back home, or call us and we’ll help.',
        actions: `<a class="btn btn--primary btn--lg" href="/">${icon('arrow-right')}Back to home</a>` + callBtn(site),
      }),
    },
  ];
}

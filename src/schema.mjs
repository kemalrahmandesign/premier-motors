// schema.org structured data (JSON-LD). Ratings and price ranges are intentionally omitted
// per the client brief; only the specials carry prices.
import { faq as faqItems } from './data/content.mjs';

const base = (site) => (site.siteUrl ? site.siteUrl.replace(/\/$/, '') : '');

export function business(site) {
  const b = base(site);
  const id = `${b}/#business`;
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRepair', 'AutoBodyShop'],
    '@id': id,
    name: site.legalName,
    alternateName: site.name,
    description:
      'Auto repair and body shop in Rockville, MD since 2003. Mechanical repair, collision repair, auto painting, Maryland State Safety Inspections and more. All insurance accepted.',
    ...(b ? { url: `${b}/`, image: `${b}/assets/img/og-image.jpg`, logo: `${b}/assets/img/icon-512.png` } : {}),
    telephone: site.phoneE164,
    email: site.email,
    foundingDate: String(site.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    hasMap: site.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: site.hours.open,
        closes: site.hours.close,
      },
    ],
    areaServed: [
      ...site.serviceArea.map((c) => ({ '@type': 'City', name: `${c}, MD` })),
      { '@type': 'AdministrativeArea', name: 'Montgomery County, MD' },
    ],
    availableLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
    ],
    knowsLanguage: ['en', 'es'],
    paymentAccepted: 'Cash, Credit Card, Auto insurance claims, CarMax MaxCare',
    slogan: 'Service and honesty on every job.',
    knowsAbout: [
      'Auto repair', 'Auto body repair', 'Collision repair', 'Insurance claim repairs', 'CarMax MaxCare repairs',
      'Maryland State Safety Inspection', 'Brake repair', 'Check engine light diagnostics', 'Engine repair',
      'Transmission repair', 'Auto A/C repair', 'Wheel alignment', 'Auto painting', 'Dent repair',
      'Windshield replacement', 'Fleet vehicle maintenance', 'Emissions repair (VEIP)',
    ],
    currenciesAccepted: 'USD',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 5 },
    ...(site.social?.length ? { sameAs: site.social.filter((s) => s.url).map((s) => s.url) } : {}),
    makesOffer: site.specials.map((sp) => ({
      '@type': 'Offer',
      name: sp.title,
      description: sp.detail,
      price: sp.price,
      priceCurrency: 'USD',
      ...(b ? { url: b + sp.url } : {}),
      itemOffered: { '@type': 'Service', name: sp.title },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Auto repair and body shop services',
      itemListElement: [
        'Body work and collision repair', 'Dent repair', 'Auto painting', 'Windshield and glass',
        'Oil change', 'Maryland State Safety Inspection', 'Brake repair', 'Suspension and steering',
        'Wheel alignment', 'Tire sales, mounting and balancing', 'Check engine light diagnostics',
        'Engine repair', 'Transmission repair', 'Clutch replacement', 'Exhaust and catalytic converters',
        'Emissions repair', 'A/C repair', 'Battery, alternator and starter', 'Towing', 'Fleet vehicle service',
        'CarMax MaxCare repairs', 'Insurance claim repairs',
      ].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
    },
  };
}

export function website(site) {
  const b = base(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    ...(b ? { url: `${b}/`, '@id': `${b}/#website` } : {}),
    inLanguage: ['en-US', 'es-US'],
    publisher: { '@id': `${b}/#business` },
  };
}

export function faqPage(items = faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function service(site, { name, serviceType, description, path, offer }) {
  const b = base(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    provider: { '@id': `${b}/#business` },
    areaServed: site.serviceArea.map((c) => ({ '@type': 'City', name: `${c}, MD` })),
    ...(b ? { url: b + path } : {}),
    ...(offer ? { offers: { '@type': 'Offer', price: offer.price, priceCurrency: 'USD', description: offer.title } } : {}),
  };
}

export function breadcrumbs(site, trail) {
  const b = base(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([path, name], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      ...(b ? { item: b + path } : {}),
    })),
  };
}

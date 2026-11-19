# Premier Motors LLC: website

Auto repair and body shop in Rockville, MD. Static site with no dependencies, built from `src/` into `dist/` by `build.mjs`. The layout follows the Marv & Mike's template, re-themed in black and brushed gold to match the logo.

## Pages

| URL | Purpose / target search |
| --- | --- |
| `/` | Main page, in the brief's section order: hero, specials, body work and insurance, why us, services, vehicles, reviews, about, fleet, FAQ, areas, contact |
| `/body-shop/` | "body shop Rockville", "collision repair Rockville" |
| `/auto-repair/` | "auto repair Rockville", plus the full service list |
| `/maryland-state-inspection/` | "MD state inspection Rockville" ($99.95 special) |
| `/oil-change/` | "oil change Rockville" ($49.99 special) |
| `/es/` | Spanish page ("taller mecánico Rockville", "se habla español") |

## Editing

- **Specials, phone, hours, address, links**: `src/data/site.json`. This is the only place prices live, and every page, card and schema entry reads from it.
- **Services, FAQ, About copy, trust points**: `src/data/content.mjs`
- **Section markup**: `src/templates/components.mjs`. Page assembly and SEO meta are in `src/pages.mjs`.
- **Styles / JS**: `src/assets/css/style.css`, `src/assets/js/main.js`

Build and preview:

```bash
npm run build
```

```bash
npm run preview
```

The preview serves at http://localhost:4173.

## Deploy (Vercel)

Import the repo in Vercel. `vercel.json` already sets `buildCommand: node build.mjs` and `outputDirectory: dist`. Once the domain is known, add an environment variable `SITE_URL=https://www.<domain>` (or fill `siteUrl` in `site.json`). That turns on canonical tags, hreflang, absolute OG image URLs and `sitemap.xml`. Without it the build warns and skips them.

## Contact form

The form posts to FormSubmit (`formEndpoint` in `site.json`) and delivers to premiermotorsmd@gmail.com. No account is needed. **The first submission sends an activation email to that inbox, and someone has to click it.** After activation, FormSubmit gives a random alias. Swap that alias in for the email in `formEndpoint` so the address isn't in the page source.

## Placeholders still waiting on the client

Per the brief, nothing below is invented. Each item is either hidden or left out until it's provided.

| Item | Where it goes |
| --- | --- |
| Domain | `siteUrl` / `SITE_URL` |
| Social links | `social` in `site.json`: `[{ "label": "Facebook", "url": "…", "icon": "facebook" }]` |
| Google review link (Place ID) | `googleReviewUrl` shows a "Leave a review" button |
| Live Google reviews widget | `reviewsWidgetHtml` (embed code from a reviews widget that pulls live) |
| Photos | Replace the gold brand panels (`brandFrame()` in `components.mjs`) with `<img>` |
| GA4 / Search Console | `ga4Id`, `googleSiteVerification` |
| ASE details, diagnostic fee, discount amounts, deductible terms | Not mentioned beyond the brief's approved wording |

## Google presence: launch checklist

The website is one piece. For a local shop, **Google Business Profile (GBP) is what puts you in the map pack.**

1. **Claim/verify the Google Business Profile** for Premier Motors LLC at 309 Howard Ave, Unit G.
   - Primary category: *Auto repair shop*. Secondary: *Auto body shop*, *Car inspection station*, *Oil change service*, *Brake shop*, *Transmission shop*, *Tire shop*.
   - Hours: Mon–Fri 8–5. Phone: (301) 340-2130. Website: the homepage.
   - Add every service from the brief under Services, the two specials as Offers posts, the "Identifies as / Languages: Spanish" attribute, and 10+ real photos (shop front, bays, team at work, finished body jobs).
2. **Use exactly the same name, address and phone (NAP) everywhere**: "Premier Motors LLC, 309 Howard Ave, Unit G, Rockville, MD 20850, (301) 340-2130".
3. **Citations** with the same NAP: Bing Places, Apple Business Connect, Yelp, Facebook, BBB, Nextdoor, CARFAX Service, RepairPal, Angi, Yellow Pages.
4. **Reviews**: get the GBP "Ask for reviews" link, put it in `googleReviewUrl`, and text or hand it to every happy customer. Steady new reviews are the biggest local ranking lever. Reply to every review.
5. **Search Console**: verify the domain, submit `/sitemap.xml`, and request indexing for each page.
6. **GBP Posts** weekly (specials, body work before/after). Link the oil-change and inspection posts to their landing pages.
7. Track calls and form leads in GA4. The site already fires `click_to_call` and `generate_lead` events once `ga4Id` is set.

## SEO already built in

- Unique title, description and H1 per page, targeted at the main local searches
- JSON-LD: `AutoRepair` + `AutoBodyShop` (address, hours, phone, Spanish language, area served, founded 2003, specials as Offers), `FAQPage`, `Service`, `BreadcrumbList`, `WebSite`. Ratings and price ranges are left out on purpose, per the brief.
- `hreflang` pairing for English and Spanish, OG/Twitter share image, favicon set, web manifest, robots.txt, sitemap
- Click-to-call on every phone number, plus a sticky mobile Call / Request bar
- Fast to load: one CSS file, one small JS file, no frameworks, lazy-loaded map

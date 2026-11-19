# Premier Motors LLC: website

Preview (GitHub Pages, redeploys on every push to the branch): https://kemalrahmandesign.github.io/premier-motors/
The preview build is `noindex` and its robots.txt blocks crawlers, so Google won't index it before the real domain is live.

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
| `/carmax-maxcare/` | "CarMax MaxCare repair shop Rockville / near me" |
| `/brake-repair/` `/check-engine-light/` `/engine-repair/` `/transmission-repair/` `/ac-repair/` `/tires/` `/fleet-service/` | Mechanical service searches |
| `/auto-painting/` `/dent-repair/` `/windshield-glass/` | Body shop service searches |
| `/review/` | Short link for review cards; forwards to `googleReviewUrl` (noindex) |

Service landing pages are data-driven: edit `src/data/servicePages.mjs`. The off-site plan (Google Business Profile, reviews, citations) is in [`docs/GOOGLE-GROWTH-PLAN.md`](docs/GOOGLE-GROWTH-PLAN.md).

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

## Contact form (Web3Forms, same as Alexandria Car Clinic)

The form posts to Web3Forms, which emails each request. To connect it:
1. Go to https://web3forms.com, enter **premiermotorsmd@gmail.com** and create an access key (it's emailed to that inbox).
2. Paste it into `web3formsKey` in `src/data/site.json`, then push.

Until the key is set, the form doesn't send. It asks visitors to call (301) 340-2130 instead.

## Placeholders still waiting on the client

Per the brief, nothing below is invented. Each item is either hidden or left out until it's provided.

| Item | Where it goes |
| --- | --- |
| Domain | `siteUrl` / `SITE_URL` |
| Social links | `social` in `site.json`: `[{ "label": "Facebook", "url": "…", "icon": "facebook" }]` |
| Google review link (Place ID) | `googleReviewUrl` shows a "Leave a review" button |
| Live Google reviews widget | `reviewsWidgetHtml` (embed code from a reviews widget that pulls live) |
| Photos | Put files in `src/assets/img/` and set `heroImage` / `aboutImage` in `site.json` (e.g. `/assets/img/hero.jpg`). They get the black-and-gold grade automatically. Until then the gold logo panels show. |
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

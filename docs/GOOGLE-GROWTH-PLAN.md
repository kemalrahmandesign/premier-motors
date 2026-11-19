# Premier Motors: Google growth plan

Goal: show up in the **Google map pack** (the 3 shops under the map) and the organic results for Rockville searches like *auto repair Rockville*, *body shop Rockville*, *MD state inspection Rockville*, *CarMax MaxCare repair shop near me*.

Three things decide local ranking: **relevance** (does Google know he does it?), **distance** (fixed), and **prominence** (reviews, links, mentions). The website covers relevance. The Google Business Profile and reviews cover prominence, and that's where most of the movement comes from.

Copy in this file stays inside the client brief: no invented prices, no "we waive your deductible," every deductible line ends with "Call for details."

---

## 1. Google Business Profile (do first, highest impact)

Claim or verify at business.google.com. Verification can take days to a couple of weeks (video or postcard), so start now, even before the domain is ready.

**Name** (exactly, nothing added): `Premier Motors LLC`
Adding keywords like "Premier Motors Auto Repair Rockville" to the name breaks Google's rules and gets profiles suspended.

**Address:** 309 Howard Ave, Unit G, Rockville, MD 20850
**Phone:** (301) 340-2130
**Hours:** Mon–Fri 8:00 AM – 5:00 PM, Sat–Sun closed. Add holiday hours whenever the shop closes.
**Website:** the homepage with tracking: `https://DOMAIN/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
**Appointment link:** `https://DOMAIN/#contact`

### Categories
- **Primary:** Auto repair shop
- **Additional** (add the ones Google offers when you type them; up to 9): Auto body shop · Car inspection station · Oil change service · Brake shop · Transmission shop · Tire shop · Auto air conditioning service · Auto glass shop · Auto painting

### Business description (paste as is; 650 of 750 characters)

> Premier Motors LLC is an independent auto repair and body shop in Rockville, MD, serving Montgomery County drivers since 2003. Our team handles mechanical repair and body work under one roof: brakes, suspension, check engine light diagnostics, engine and transmission repair, A/C, tires and alignment, Maryland State Safety Inspections, collision repair, dent repair, auto painting, and windshield and glass. We work with all insurance companies and accept all CarMax MaxCare coverage. Free estimates, same-day service on most common jobs, and a 12-month / 12,000-mile warranty on parts and labor. Fleet and work van service too. Se habla español.

### Services (Edit profile → Services; add each with its description)
| Service | Description (≤300 chars) |
| --- | --- |
| CarMax MaxCare repairs | We accept all CarMax MaxCare coverage. Save on your deductible. Call (301) 340-2130 for details. |
| Insurance claim repairs | We work with all insurance companies. Save on your deductible: up to $500. Call for details. |
| Collision repair | Body work and collision repair, from minor scrapes to major damage. Free estimates. |
| Dent repair | Door dings, hail and parking-lot dents. Free estimates. |
| Auto painting | Panel refinishing and paint matched to your vehicle. |
| Windshield & glass | Windshield and auto glass replacement. |
| Maryland State Safety Inspection | MD state safety inspection, with repairs done in-house if your vehicle needs work to pass. |
| Oil change | Conventional and synthetic oil changes, filters and fluid services. |
| Brake repair | Pads, rotors, calipers, brake lines and ABS. |
| Check engine light diagnostics | We find the cause and give you a free estimate. Emissions repair to pass VEIP. |
| Engine repair | Leaks, gaskets, mounts, cooling systems, timing belts, major engine work and replacement. |
| Transmission repair | Transmission service, repair and replacement, clutches, differentials, 4x4 and AWD. |
| A/C & heating repair | A/C recharge and repair, heater and blower motor. |
| Tires & alignment | Tire sales, mount and balance, rotation and wheel alignment. |
| Suspension & steering | Shocks, struts, control arms, ball joints, tie rods, bushings, wheel bearings and CV axles. |
| Fleet & work van service | 24 years servicing fleets: Transit, ProMaster, Express, Sprinter, pickups and company cars. |
| Towing | Towing available. Call us. |

### Products (Edit profile → Products). These are the only prices.
- **Oil Change + Filter + Tire Rotation**: $49.99 (reg. $120). Up to 5 qt full synthetic. Link: `/oil-change/`
- **Maryland State Safety Inspection**: $99.95 (reg. $129.95). Link: `/maryland-state-inspection/`

### Photos (biggest easy win after reviews)
Upload 15–25 real photos now, then 2–4 new ones every week. Profiles with fresh photos get more calls and direction requests.
Shot list: building from the street with the sign · the Unit G door and the key drop · each service bay · a car on the lift · body work before/after (no license plates) · paint work · tools and the diagnostic scanner · the waiting area · the team at work (only people who are OK being shown, **never the owner**) · work vans being serviced.
Don't upload stock photos or AI images. Google prefers real photos and can remove fake ones.

### Posts (Add update; one a week; each stays visible)
Rotate these. Add a photo and a button (Call now / Book).

1. **Oil change special.** $49.99 oil change, filter and tire rotation with up to 5 qt full synthetic (reg. $120). Call or stop by to schedule. Specials subject to change. → `/oil-change/`
2. **MD inspection special.** Maryland State Safety Inspection, $99.95 (reg. $129.95). Walk-ins welcome, and repairs done in-house if you need them. → `/maryland-state-inspection/`
3. **CarMax MaxCare.** Bought your car at CarMax? We accept all CarMax MaxCare coverage at our Rockville shop. Save on your deductible. Call (301) 340-2130 for details. → `/carmax-maxcare/`
4. **Insurance & collision.** We work with all insurance companies. Save on your deductible: up to $500. Call for details. Free estimates on body work. → `/body-shop/`
5. **Fleet.** 24 years keeping work vehicles on the road. Contractors, delivery vans, company cars: call to set up service for your business. → `/fleet-service/`
6. **Se habla español.** Taller mecánico y de carrocería en Rockville desde 2003. Aceptamos todos los seguros y CarMax MaxCare. Llame al (301) 340-2130. → `/es/`

---

## 2. Reviews (the #1 ranking and conversion factor)

Target: **a steady 4–8 new reviews a month**, not a one-time burst. Reply to every review within a few days.

Once the profile is verified: open the GBP dashboard, click "Ask for reviews," copy the link, and put it in `googleReviewUrl` in `src/data/site.json`. Then **`DOMAIN/review/`** forwards to it. Print that short link and a QR code on:
- a small card handed back with the keys
- the invoice / receipt
- a sign by the counter and the key drop

**Ask everyone.** Google prohibits offering discounts or gifts for reviews and asking only happy customers. Don't tell customers what words to use.

In person (at key handoff):
> "Thanks for coming in. If we took good care of you, a quick Google review really helps a small shop like ours. Here's the link."

By email (after the job):
> Subject: Thanks from Premier Motors
> Thanks for trusting Premier Motors with your [vehicle]. If you have a minute, would you share how it went on Google? It helps other Rockville drivers find an honest shop: DOMAIN/review
> Premier Motors · (301) 340-2130

En español:
> Gracias por confiar en Premier Motors. Si tiene un minuto, ¿podría dejarnos una reseña en Google? Ayuda mucho a un taller pequeño: DOMAIN/review

Reply templates:
- **5 stars:** "Thanks, [Name]! Glad we could take care of your [car / brakes / body work]. See you next time. Premier Motors"
- **Critical:** "Thanks for the feedback, [Name]. We're sorry this wasn't the experience we aim for. Please call us at (301) 340-2130 so we can make it right." Keep it short, calm, no details about the job, never argue.

---

## 3. Same name, address and phone everywhere (citations)

Use **exactly**: `Premier Motors LLC · 309 Howard Ave, Unit G, Rockville, MD 20850 · (301) 340-2130`. Same spelling and format every time.

Priority order:
1. **Bing Places** (can import straight from Google)
2. **Apple Business Connect** (shows up in Apple Maps / Siri on iPhones)
3. **Yelp** (claim the free listing; don't pay for ads to start)
4. **Facebook page** (then add it to `social` in site.json)
5. **Nextdoor business page** (strong for neighborhood word of mouth)
6. **BBB**, **Yellow Pages / YP.com**, **Angi**, **MapQuest**, **Foursquare**
7. Auto-specific: **RepairPal**, **CARFAX shop listing** (if the shop's software supports it), **Mechanic Advisor**
8. Data aggregators that feed hundreds of smaller sites: **Data Axle** and **Foursquare**

Look up any old listings under a previous phone number or address and fix or remove them.

---

## 4. Links & local mentions (prominence)
- **Rockville Chamber of Commerce** / **Montgomery County Chamber**: membership listings link to the site.
- **Maryland Hispanic Chamber of Commerce**: fits "Se habla español."
- Sponsor a local youth team, school event or charity drive; they usually link to sponsors.
- Ask parts suppliers, tow partners and fleet customers (with permission) to link to the site.
- Share the specials and the MaxCare post in local Facebook groups and on Nextdoor.

---

## 5. When the domain is ready
1. Deploy on Vercel with `SITE_URL=https://www.DOMAIN`. This turns on canonical tags, hreflang, the sitemap and absolute share images.
2. **Google Search Console**: verify the domain and submit `https://www.DOMAIN/sitemap.xml`. Use *URL Inspection → Request indexing* on: home, /carmax-maxcare/, /body-shop/, /auto-repair/, /maryland-state-inspection/, /oil-change/.
3. **Bing Webmaster Tools**: import from Search Console (this also feeds ChatGPT and Copilot search).
4. Put the website and appointment links in the Google Business Profile (section 1).
5. Add `ga4Id` to `site.json`. Calls and form leads are tracked automatically (`click_to_call`, `generate_lead`).
6. The GitHub Pages preview stays `noindex`, so it won't compete with the real domain.

---

## 6. Optional paid boost (fastest way to get calls while organic grows)
- **Google Local Services Ads**: check whether auto repair is eligible in Rockville. You pay per lead and get the "Google Screened" badge.
- **Google Ads (search)**, small budget, tightly local (5–8 mi radius), during shop hours. Ad groups: *body shop / collision*, *MD inspection*, *oil change special*, *CarMax MaxCare repair shop*.
  - CarMax is a trademark. Using it as a **keyword** is generally fine. Using "CarMax" in **ad text** can be restricted, so write ads like "Extended warranty repairs · MaxCare accepted" and check Google's trademark policy.

---

## 7. Weekly routine (15 minutes)
- [ ] 1 Google post (rotate the list in section 1)
- [ ] 2–4 new real photos
- [ ] Reply to every new review
- [ ] Hand the review card to every customer
- [ ] Check GBP Insights: calls, direction requests, searches

## What's already done on the website
- Landing pages built around the searches people make: CarMax MaxCare, body shop, auto painting, dent repair, windshield & glass, auto repair, brakes, check engine light, engine, transmission, A/C, tires & alignment, MD inspection, oil change, fleet, Spanish
- CarMax MaxCare in the top bar, header menu, hero, insurance section, footer, form dropdown, structured data and llms.txt
- Structured data: AutoRepair + AutoBodyShop (address, hours, phone, Spanish, area served, specials, services incl. CarMax MaxCare and insurance claims), Service, FAQ and Breadcrumb data on every page
- Internal links between related services, a sitemap, `llms.txt` for AI assistants, and the `/review/` short link
- Click-to-call everywhere, a sticky mobile call bar, and a fast-loading site with no frameworks

## Expectations
- Verification: days to 2 weeks
- First movement in map results: often 4–8 weeks after the profile is verified, complete, and getting reviews
- Strong position: usually 3–6 months of steady reviews, photos and posts. Nobody can guarantee a #1 spot; consistency is what wins.

# Premier Motors: getting Google reviews (QR codes + NFC tags)

Reference for us, not for the website. **Goal: every customer is asked for a Google review, every time.** A steady 4–8 new reviews a month is the biggest single thing that moves him up in the Rockville map results and gets people to call.

---

## 1. The link everything points to

| Stage | Link the QR / NFC should open |
| --- | --- |
| **Right now (interim)** | Google Maps search for the shop: `https://www.google.com/maps/search/?api=1&query=Premier+Motors+LLC+309+Howard+Ave+Unit+G+Rockville+MD+20850`. Opens his Maps listing; the customer taps **Reviews → Write a review**. |
| **As soon as his Google Business Profile is verified** | The direct review link (opens the star-rating box right away). In the GBP dashboard: **Ask for reviews / Get more reviews → copy link**. It looks like `https://g.page/r/XXXXXXXX/review`. |
| **After the domain is live** | `https://DOMAIN/review/`. Our site forwards it to the review link, so we can change the destination later **without reprinting cards or reprogramming tags**. |

**Current setup (domain is live):** every QR code and printout in `docs/reviews/` opens `https://premiermotorsmd.com/review/`, which forwards to `googleReviewUrl` in `site.json` (or the Maps listing until that's filled in). To switch to the direct review link, just paste it into `googleReviewUrl` and push. **No reprinting, no reprogramming.** Program NFC tags with the same `premiermotorsmd.com/review/` link.

When the review link exists, also paste it into `googleReviewUrl` in `src/data/site.json` so the site's "Leave a review" button and `/review/` use it.

---

## 2. QR code files (ready now): `docs/reviews/`

| File | Use |
| --- | --- |
| `review-qr.png` / `review-qr.svg` | The QR on its own: invoices, receipts, window decal, email signature |
| `review-card.pdf` (3.5 × 2 in) | Business-card size handout. Give one back with the keys on every job. Any print shop or Vistaprint "standard business card" |
| `review-flyer-letter.pdf` (8.5 × 11 in) | Full-page "Leave us a review" flyer. White background, prints fine on any office printer. Tape at the counter, in the waiting area, by the key drop |
| `review-sign-5x7.pdf` (5 × 7 in) | Counter / waiting-area sign in an acrylic stand; one by the key drop |
| `review-link.txt` | The exact link the QR opens |

**Regenerate** (only needed if the design changes; the link already forwards):
```bash
python3 tools/make-review-qr.py            # defaults to https://premiermotorsmd.com/review/
```
```bash
node tools/render-review-cards.mjs
```

Print tips: matte card stock, print at 100% (no "fit to page"), keep the QR at least **0.8 in** wide on cards and **2 in** on signs, and test-scan one copy before ordering the batch.

---

## 3. NFC tags (tap-to-review)

A customer taps their phone on the tag and Google opens. No app is needed on modern phones: iPhone XS and newer and most Androids read tags automatically when the phone is unlocked.

**What to buy:**
- **Blank NTAG215 (or NTAG213/216) NFC stickers or cards**, 10–20 pack. Inexpensive on Amazon. Stickers go on the counter stand, the clipboard, the invoice folder and the key-drop box; cards go on the counter.
- If sticking onto **metal** (toolboxes, key-drop box), buy **"anti-metal" / on-metal NFC tags**. Regular tags don't read on metal.
- Optional: an acrylic counter stand that holds the 5×7 sign, with an NFC sticker on the back of the stand (QR + tap in one place).

**Avoid** pre-programmed "Google review tap cards" that route through the seller's own link or need a monthly subscription. If the company disappears, every tag stops working. Blank tags we program ourselves are cheaper and permanent.

**How to program a tag (2 minutes, free):**
1. Install **NFC Tools** (iPhone or Android).
2. **Write → Add a record → URL/URI** → paste the review link (see section 1).
3. Tap **Write**, then hold the phone on the tag until it confirms.
4. Test it with **one iPhone and one Android** before sticking it down.
5. **Don't lock the tags** yet. Unlocked tags can be rewritten when we switch to `DOMAIN/review/`. Lock them only after that final link is on them, if at all.

Put a small label next to every tag: **"Tap or scan to review us on Google"**. People don't know to tap otherwise.

---

## 4. The ask (this matters more than the hardware)

**Ask every customer, every job, at key handoff.** Google's rules: don't offer discounts or gifts for reviews, don't only ask happy customers, don't tell people what to write.

Script (owner or front desk):
> "Thanks for coming in. If we took good care of you, would you leave us a quick Google review? Just scan this or tap your phone here. It really helps a small shop."

En español:
> "Gracias por venir. Si quedó contento con el servicio, ¿nos deja una reseña en Google? Solo escanee el código o acerque su teléfono aquí. Nos ayuda mucho."

Follow-up email the same day (the email address is on the appointment form):
> Subject: Thanks from Premier Motors
> Thanks for trusting Premier Motors with your [vehicle]. If you have a minute, would you share how it went on Google? It helps other Rockville drivers find an honest shop: [review link]
> Premier Motors · (301) 340-2130

**Also ask:**
- **Past and regular customers** with a one-time email or call: "We just launched our new website and we're asking our longtime customers for a Google review."
- **Fleet / business customers.** Ask the fleet manager for a review.
- **CarMax MaxCare and insurance-claim customers.** Ask them like everyone else; their reviews naturally mention it, which helps those searches.

**Reply to every review within a few days.** Templates are in `docs/GOOGLE-GROWTH-PLAN.md`.

---

## 5. Getting reviews onto the website

The site's reviews section is ready and shows **real Google reviews only**. Two ways to fill it:
1. **Live from Google (recommended):** once his Google Business Profile is set up, get the **Place ID** and a **Google Maps API key** (restricted to the site's domain; Maps JavaScript API + Places API (New)). Put both in `site.json` (`googlePlaceId`, `googleMapsApiKey`). The site then shows his live star rating, review count and recent reviews. There's a small monthly free usage allowance; check Google's current pricing.
2. **Copy real reviews in by hand:** paste reviews **word for word** into `reviews[]` in `site.json` (name, text, star rating, date, link). Never edit or write review text.

## 6. Weekly check
- [ ] Count new reviews this week (goal: at least 1–2)
- [ ] Reply to each one
- [ ] Cards stocked at the counter, sign visible, tags working (test-tap one)

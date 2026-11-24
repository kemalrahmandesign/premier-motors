#!/usr/bin/env python3
"""Make the Google-review QR code and printable review cards.

Usage:
    pip install segno
    python3 tools/make-review-qr.py "https://g.page/r/XXXXXXXX/review"
    node tools/render-review-cards.mjs        # turns the HTML cards into print-ready PDFs + PNG previews

Writes into docs/reviews/:
    review-qr.svg / review-qr.png   QR code on its own (for stickers, invoices, signs)
    card.html / sign.html           printable designs that embed the QR
    review-link.txt                 the exact link the QR opens

Point the QR at the Google review link from the Google Business Profile ("Ask for reviews").
After the domain is live, point it at https://DOMAIN/review/ instead: that page forwards to the
review link, so the destination can change later without reprinting anything.
"""
import sys
from pathlib import Path

import segno

DEFAULT = 'https://premiermotorsmd.com/review/'
url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT
out = Path(__file__).resolve().parent.parent / 'docs' / 'reviews'
out.mkdir(parents=True, exist_ok=True)

qr = segno.make(url, error='h')
qr.save(out / 'review-qr.svg', scale=10, border=2, dark='#0a0a0a', light='#ffffff')
qr.save(out / 'review-qr.png', scale=20, border=2, dark='#0a0a0a', light='#ffffff')
(out / 'review-link.txt').write_text(url + '\n')

svg_inline = qr.svg_inline(scale=10, border=0, dark='#0a0a0a', light=None, omitsize=True)

FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=Michroma&display=swap">'
BASE_CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fff;font-family:Archivo,system-ui,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.gold{background:linear-gradient(120deg,#f3e8c4 0%,#d4bb88 32%,#a98b56 62%,#e4d4a6 100%)}
.label{font-family:Michroma,sans-serif;letter-spacing:.22em;text-transform:uppercase}
.qr-box{background:#fff;border-radius:10px;display:grid;place-items:center}
.qr-box svg{width:100%;height:100%;display:block}
"""

card = f"""<!doctype html><html><head><meta charset="utf-8"><title>Review card</title>{FONTS}<style>{BASE_CSS}
@page{{size:3.5in 2in;margin:0}}
.card{{width:3.5in;height:2in;background:#0a0a0a;color:#f3efe7;display:grid;grid-template-columns:1fr 1.32in;gap:.14in;padding:.17in .18in;position:relative;overflow:hidden}}
.card:before{{content:"";position:absolute;inset:.07in;border:1px solid rgba(201,174,120,.35);border-radius:.08in;pointer-events:none}}
.left{{display:flex;flex-direction:column;justify-content:space-between;position:relative}}
.mark{{height:.3in;width:auto;align-self:flex-start}}
h1{{font-size:15.5px;line-height:1.12;font-stretch:115%;font-weight:650;letter-spacing:-.01em}}
h1 span{{background:linear-gradient(120deg,#f3e8c4,#c9ae78 55%,#a98b56);-webkit-background-clip:text;background-clip:text;color:transparent}}
.small{{font-size:7.4px;line-height:1.35;color:#b8b1a3}}
.label{{font-size:5.6px;color:#c9ae78}}
.qr-wrap{{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.05in;position:relative}}
.qr-box{{width:1.22in;height:1.22in;padding:.07in}}
.stars{{color:#c9ae78;font-size:9px;letter-spacing:2px}}
</style></head><body><div class="card">
  <div class="left">
    <img class="mark" src="../../src/assets/img/logo-mark.png" alt="">
    <div>
      <div class="label">Premier Motors</div>
      <h1 style="margin-top:4px">Happy with<br>your service?<br><span>Leave us a review.</span></h1>
    </div>
    <p class="small">Scan with your phone camera.<br>It takes 30 seconds and helps a local shop.</p>
  </div>
  <div class="qr-wrap"><div class="qr-box">{svg_inline}</div><div class="stars">★★★★★</div></div>
</div></body></html>"""

sign = f"""<!doctype html><html><head><meta charset="utf-8"><title>Review sign</title>{FONTS}<style>{BASE_CSS}
@page{{size:5in 7in;margin:0}}
.sign{{width:5in;height:7in;background:#0a0a0a;color:#f3efe7;padding:.42in .4in;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative}}
.sign:before{{content:"";position:absolute;inset:.14in;border:1px solid rgba(201,174,120,.4);border-radius:.14in}}
.logo{{width:2.3in;height:auto;margin-top:.05in}}
.label{{font-size:8.5px;color:#c9ae78;margin-top:.26in}}
h1{{font-size:31px;line-height:1.05;font-stretch:118%;font-weight:650;letter-spacing:-.02em;margin-top:.12in}}
h1 span{{background:linear-gradient(120deg,#f3e8c4,#c9ae78 55%,#a98b56);-webkit-background-clip:text;background-clip:text;color:transparent}}
.qr-box{{width:2.25in;height:2.25in;padding:.12in;margin-top:.3in;border-radius:16px}}
p{{font-size:12.5px;line-height:1.45;color:#b8b1a3;margin-top:.22in;max-width:3.6in}}
.es{{font-size:11px;color:#858073;margin-top:.1in}}
.bar{{position:absolute;left:0;right:0;bottom:0;height:.1in}}
</style></head><body><div class="sign">
  <img class="logo" src="../../src/assets/img/logo-full.png" alt="Premier Motors LLC">
  <div class="label">Thank you for choosing us</div>
  <h1>Enjoyed your visit?<br><span>Review us on Google.</span></h1>
  <div class="qr-box">{svg_inline}</div>
  <p>Point your phone camera at the code. Your review helps your neighbors find an honest shop.</p>
  <p class="es">¿Le gustó nuestro servicio? Escanee el código y déjenos una reseña en Google.</p>
  <div class="bar gold"></div>
</div></body></html>"""

# Full-page flyer (US Letter). White background so it prints cleanly on any office printer.
flyer = f"""<!doctype html><html><head><meta charset="utf-8"><title>Review flyer</title>{FONTS}<style>{BASE_CSS}
@page{{size:8.5in 11in;margin:0}}
.page{{width:8.5in;height:11in;background:#fff;color:#0a0a0a;padding:.55in .7in .5in;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative}}
.page:before{{content:"";position:absolute;inset:.32in;border:1.5px solid #c9ae78;border-radius:.2in}}
.top{{position:absolute;left:.32in;right:.32in;top:.32in;height:.12in;border-radius:.2in .2in 0 0}}
.logo-wrap{{background:#0a0a0a;border-radius:.16in;padding:.2in .42in;margin-top:.3in}}
.logo{{width:2.6in;height:auto;display:block}}
.label{{font-size:10px;color:#8a6d3b;margin-top:.34in}}
h1{{font-size:58px;line-height:1;font-stretch:118%;font-weight:700;letter-spacing:-.025em;margin-top:.14in}}
h1 span{{display:block;font-size:34px;font-weight:600;margin-top:.08in;background:linear-gradient(120deg,#b8955a,#8a6d3b 60%,#6f5629);-webkit-background-clip:text;background-clip:text;color:transparent}}
.qr-box{{width:3.7in;height:3.7in;padding:.16in;margin-top:.34in;border:2px solid #0a0a0a;border-radius:.22in;background:#fff}}
.steps{{display:flex;gap:.22in;margin-top:.34in;text-align:left}}
.step{{display:flex;gap:.1in;align-items:flex-start;width:2.1in}}
.n{{flex:none;width:.32in;height:.32in;border-radius:50%;background:#0a0a0a;color:#e4d4a6;font-weight:700;font-size:14px;display:grid;place-items:center}}
.step p{{font-size:13.5px;line-height:1.35;color:#2b2a27}}
.es{{font-size:14px;color:#55524c;margin-top:.26in;max-width:6in}}
.foot{{position:absolute;bottom:.52in;left:0;right:0;font-size:13px;color:#2b2a27;letter-spacing:.02em}}
.foot b{{font-weight:700}}
</style></head><body><div class="page">
  <div class="top gold"></div>
  <div class="logo-wrap"><img class="logo" src="../../src/assets/img/logo-full.png" alt="Premier Motors LLC"></div>
  <div class="label">Thank you for choosing Premier Motors</div>
  <h1>Leave us a review<span>on Google</span></h1>
  <div class="qr-box">{svg_inline}</div>
  <div class="steps">
    <div class="step"><div class="n">1</div><p>Open the camera on your phone.</p></div>
    <div class="step"><div class="n">2</div><p>Point it at the code and tap the link.</p></div>
    <div class="step"><div class="n">3</div><p>Pick your stars and share how it went.</p></div>
  </div>
  <p class="es">¿Le gustó nuestro servicio? Escanee el código y déjenos una reseña en Google. ¡Gracias!</p>
  <div class="foot"><b>Premier Motors</b> · 309 Howard Ave, Unit G, Rockville, MD · (301) 340-2130 · premiermotorsmd.com</div>
</div></body></html>"""

(out / 'card.html').write_text(card)
(out / 'sign.html').write_text(sign)
(out / 'flyer.html').write_text(flyer)
print('QR ->', url)
print('wrote', ', '.join(p.name for p in sorted(out.iterdir())))

# ayershospitality.com

Static site, hosted on GitHub Pages. Push to `main` and it deploys in about a minute.

## One-time setup (GitHub)
1. Create repo `CrispyVenom962/ayershospitality-site` (public), upload everything in this folder to the root.
2. Repo > Settings > Pages > Source: "Deploy from a branch" > Branch: `main` / `/ (root)` > Save.
3. Under Custom domain enter `www.ayershospitality.com` > Save. When the DNS check passes, tick **Enforce HTTPS** (can take up to an hour to become available).

## One-time setup (Wix > Manage DNS records)
Delete the three existing A records (185.230.63.x) and add these four A records, host name `ayershospitality.com`:

    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153

Edit the CNAME `www.ayershospitality.com`: change value from `cdn3.wixdns.net` to `crispyvenom962.github.io`
Delete the `en.` and `pt.` CNAME records (Wix multilingual leftovers).
Leave NS and everything else alone.

Propagation: usually under an hour (TTL is 1 hour). The old Wix site keeps showing until then.

## Before going live - find and replace
- `[CAL-LINK]` - Cal.com event link for the free 20-min call (all pages)
- `[WHATSAPP-NUMBER]` - digits only, e.g. 351910000000 (contact pages)
- `[+351 XXX XXX XXX]` - display version of the number (contact pages)
- `[PORTO ADDRESS]` / `[MORADA PORTO]` - footer, or delete
- `hello@ayershospitality.com` - replace with the address you actually use, or set up forwarding later

## Photos
Upload to the top level (no folder), exact names: `hero.jpg` (property, 4:5 or wider), `team.jpg` (you and Stephen on site), `detail.jpg` (working-hotel detail), `band.jpg` (landscape, darkened by CSS), `stephen.jpg`, `william.jpg` (square headshots). Any that are missing are simply hidden. JPG, max 1600px wide, under 300 KB.

## Prices
Edit in `services.html` and `pt-servicos.html`, plus the three headline prices in both `index.html` files. Keep them matching.

## Structure
    index.html  services.html  about.html  contact.html              (English)
    pt.html  pt-servicos.html  pt-sobre.html  pt-contacto.html   (Portuguese)
    about-1.html  contact-1.html   redirects for the old Wix URLs
    style.css  CNAME  sitemap.xml  robots.txt

`CNAME` must stay - it tells GitHub Pages which domain to serve.

## After it's live
- Cancel the Wix Premium *site* plan (Billing). Keep the domain and its auto-renew.
- Add the site to Google Search Console and submit sitemap.xml.

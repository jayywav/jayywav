# jayy.wav website

A fast, responsive one-page site built around the business structure discussed:
- Recording appointments -> Square booking
- Mixing & mastering -> purchase/payment link
- Beat leases -> digital product/payment links
- Studio information + booking policies

## Quick start
Open `index.html` in a browser.

## Put it online free
### GitHub Pages
1. Create a new public GitHub repository.
2. Upload everything in this folder.
3. Open Settings -> Pages.
4. Set deployment source to the `main` branch / root.
5. GitHub gives you a public URL.

### Cloudflare Pages
1. Create a Pages project.
2. Connect the GitHub repository.
3. No build command is needed.
4. Output directory is `/`.

## Connect Square
Open `script.js`.
- `bookingUrl` is already set to https://jayywav.square.site/
- Paste the Square payment link for Mix & Master into `mixMasterUrl`.
- Paste each beat lease payment link into `beat1Url`, `beat2Url`, etc.

## Edit beat listings
In `index.html`, search for `Beat Title`. Replace each title and add artwork/audio when ready.

## Current pricing/content
Recording:
- 2 hours — $160
- 3 hours — $225
- 4 hours — $300
- $100 deposit required

Mix & Master:
- Starting at $100/song
- Up to 2 revisions
- 3–5 business day turnaround

Booking policy:
- Studio availability is confirmed after booking.
- If the selected studio time is unavailable, client is offered alternatives.
- If no alternative works, deposit is refunded.
- Once studio/time is confirmed, deposit is non-refundable.
- 24 hours notice requested for rescheduling.

## Important
The beat cards are placeholders until you have beat names, audio, artwork, lease prices, and payment links.

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


## Beat player upgrade
The Beats section now works like a compact embedded beat-store player:
- Play/pause one beat at a time
- Scrubbable audio progress bar
- Current time / duration
- Beat title, BPM, key, lease price
- Lease button per beat
- Responsive mobile layout

### Add beat previews
Drop tagged MP3 previews into `assets/audio/`.
The default filenames are:
- `beat-01-preview.mp3`
- `beat-02-preview.mp3`
- `beat-03-preview.mp3`

Then edit the beat title, BPM, key, and lease price in `index.html`.
Put each Square payment link in `script.js` under the relevant `leaseUrl`.


## 10-beat store
The Beat Store is now generated from one editable `CONFIG.beats` list in `script.js`.

For each beat you can edit:
- `title`
- `producer`
- `bpm`
- `key`
- `price`
- `audio`
- `cover`
- `leaseUrl`

This means you can swap any of the 10 beats without rewriting HTML.

### Exclusive beats
Set `exclusiveContactUrl` near the top of `script.js` to your Instagram DM/contact page.
The site includes a PRIVATE CATALOG section:
"Not every beat makes it to the store..."

### Beat files
Tagged MP3 previews go in:
`assets/audio/`

Optional cover art goes in:
`assets/beats/`


## Booking-link update
All BOOK / BOOK NOW / recording CTA links now go directly to the Square Appointments service-selection page:

https://book.squareup.com/appointments/fmq60xo7tefxn9/location/LDASSRJMBXEFB/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so&team_member_id=TMlT9jP4nBm4KwH1

## Private beat catalog note
The large exclusive-beats section was replaced with a compact message directly under the beat player:
"MORE EXCLUSIVE BEATS ARE IN THE VAULT. Contact jayy.wav directly to hear private production not listed on the site."


## Live Payhip connection
Beat 01 is now connected to Payhip:
- Title: vennie [plugg]
- BPM: 151
- Producer: @_jayy.wav
- Lease price: $50
- Checkout: https://payhip.com/b/d0PDW

The LEASE button for Beat 01 opens Payhip, where Square handles payment and Payhip delivers the purchased file.


## Recording booking flow update
The Recording section now clearly explains:
- 2 hr — $160
- 3 hr — $225
- 4 hr — $300
- $100 deposit required
- Studio availability is confirmed after the booking request
- Booking 1–2 days ahead is recommended
- Same-day sessions are not guaranteed
- If no alternative studio time works, the deposit is refunded
- Once studio + time are confirmed, the booking is locked in

There are now two CTAs:
- BOOK YOUR SESSION -> direct Square Appointments link
- CHECK AVAILABILITY FIRST -> configurable in `script.js` as `availabilityContactUrl`


## Direct contact update
The Recording booking section now has three direct contact buttons for availability:
- TEXT ME -> sms:6785515333
- CALL ME -> tel:6785515333
- INSTAGRAM -> https://www.instagram.com/_jayy.wav/

Displayed contact details:
- Phone: (678) 551-5333
- Instagram: @_jayy.wav


## Hero + same-day language update
Hero headline changed from:
"MAKE THE RECORD. MAKE IT HIT."

to:
"RECORD WITH JAYY.WAV"

Booking policy now explicitly says:
"Same-day sessions are first come, first serve and are not guaranteed."


## Confirmed-session deposit flow

Approved-client landing page:
https://jayywav.github.io/jayywav/session-confirmed/

Square deposit checkout:
https://square.link/u/vFL2sSN9

After-checkout redirect page:
https://jayywav.github.io/jayywav/deposit-received/

### Square setup
Edit the $100 Recording Session Deposit payment link and set "Redirect to website after checkout" to:
https://jayywav.github.io/jayywav/deposit-received/

### Workflow
1. Client sends a session request.
2. jayy.wav verifies studio availability.
3. jayy.wav sends the client the `/session-confirmed/` link.
4. Client pays the $100 Square deposit.
5. Square redirects the client to `/deposit-received/`.
6. jayy.wav creates/finalizes the confirmed appointment in Square.


## Public recording flow — corrected

The public site no longer sends customers into the Square appointment calendar.

Public flow:
1. Customer reads HOW BOOKING WORKS.
2. Customer completes the SESSION REQUEST form.
3. Clicking TEXT SESSION REQUEST opens a prefilled SMS to (678) 551-5333 with:
   - name / artist name
   - phone
   - 2 / 3 / 4 hour package
   - preferred date/time
   - backup date/time
   - notes
4. jayy.wav checks studio availability.
5. If approved, jayy.wav sends the private `/session-confirmed/` page.
6. Customer pays the $100 Square deposit.
7. jayy.wav creates/finalizes the appointment in Square.

All public recording CTAs now lead to `#request`, not Square Appointments.


## Latest business-system update

### Beat license ladder
Recommended public pricing:
- MP3 — $49.99
- WAV — $69.99
- Trackouts — $99.99
- Unlimited — $149.99
- Exclusive — negotiate

The Beat Store now opens a license chooser. Each beat can have a separate Payhip checkout URL for each license tier inside `script.js` under `licenseUrls`.

### Premium-room pricing
Base session packages remain:
- 2 hr — $160
- 3 hr — $225
- 4 hr — $300

The site now states that premium rooms or specific studio requests may require an additional fee, always quoted before the deposit.

### Studio-confirm helper
A non-linked helper page exists at:
`/studio-confirm/`

After a studio gives you availability, open that page, enter the client/studio/date/time/package, and it opens a uniform prefilled text containing the private deposit-page link.

GitHub Pages is public, so this helper URL is not truly private/password-protected. It stores no entered data.


## Same-day contact update
The HOW BOOKING WORKS section now has:
`SAME-DAY? TEXT OR DM`

Clicking it opens a chooser:
- TEXT JAYY.WAV -> opens a prefilled SMS to (678) 551-5333
- DM ON INSTAGRAM -> opens @_jayy.wav
- A suggested DM message is shown in the modal


## Studio-confirm v2
The internal `/studio-confirm/` helper now supports:
- STANDARD mode
- SAME-DAY MODE (auto-fills today's date)
- Live confirmation-message preview
- OPEN TEXT (opens a prefilled SMS to the client)
- COPY MESSAGE (for Instagram DM or any other messaging app)
- OPEN INSTAGRAM shortcut
- Private deposit-page shortcut

For same-day clients:
1. Client texts or DMs.
2. Check studio availability.
3. Open `/studio-confirm/`.
4. Tap SAME-DAY MODE.
5. Fill studio, room, time, package, and client info.
6. Use OPEN TEXT for SMS or COPY MESSAGE + OPEN INSTAGRAM for DM.

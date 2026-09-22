# 0x0khalid.github.io

Personal homepage, closely modeled on jdhruv.dev's real layout: bordered
"screen-line" column with corner tick marks, diagonal-stripe section
dividers, hero with avatar + name + status, an About panel (bullet list)
with a real Spotify embed player, a Connect panel with link pills, a GitHub
Activity panel, and a collapsible Projects timeline. Colors,
spacing and the header/footer nav structure (Home, Projects, More
dropdown, search, theme toggle) are pulled from jdhruv.dev's own
compiled CSS and markup, not guessed. The typeface, however, is pulled
from a different site — see below.

## Fonts and icons — where they actually came from

- **Departure Mono** is the site-wide font, taken from
  [rohith.net](https://rohith.net) — checked its actual compiled
  stylesheet (not guessed) and found it uses this one monospace font
  for everything: body text, code, and headings all inherit it there,
  no separate heading font. Downloaded straight from
  `rohith.net/fonts/DepartureMono-Regular.woff2` and self-hosted here
  as `fonts/DepartureMono-Regular.woff2`. It's licensed under the SIL
  Open Font License (confirmed at
  [departuremono.com](https://departuremono.com)), so redistributing
  and embedding it here is fine. It only ships weight 400 (regular);
  anywhere this page asks for a bolder weight, the browser synthesizes
  it, since there's no separate bold file.
- **JetBrains Mono** is used for the About/Projects body content and
  the footer's "Built in the SOC..." line — Departure Mono's stylized
  look works well for headings and nav but reads less clearly for
  denser paragraph text, so this swaps in a font actually designed
  for reading monospace text comfortably. Self-hosted as
  `fonts/JetBrainsMono-Variable.woff2`, also SIL OFL licensed.
- **The second avatar** (`avatar-alt.png`) is the illustrated portrait
  you uploaded directly — click the toggle button next to the hero
  avatar (mirroring jdhruv.dev's "Toggle pfp" button, with a pop/spin
  transition on both the button and the crossfade) to switch between
  your photo and this portrait.

## What's real vs. placeholder

Pulled from your actual X profile (`@5e9`, display name "Khalid") by
fetching the page source directly, not guessed:

- **Photo** — `pfp.jpg` is your real X profile photo (400×400), used
  for the hero avatar. It's the only avatar image now; the camel
  toggle/mascot was removed on request.
- **X/Twitter link** — corrected to `https://x.com/5e9`. The earlier
  version pointed at `x.com/0x0khalid`, which doesn't exist as an
  account (X returns "User Profile Not Found" for it).

X doesn't expose your bio text, location, or link without an
authenticated API call, so I couldn't pull those — only the photo,
handle, and display name were available from the public page.

Everything else is still a placeholder — search `index.html` for
`EDIT:` comments to find every spot to personalize:

- "More" dropdown's "Blog" item (still `#`; "Repo" now links to your GitHub profile)
- Footer line ("Built with code and coffee")

## Projects and GitHub Activity — what's actually real

- **Projects** links to your most recently pushed public repo
  (`github.com/0x0khalid/0xkhalid`, checked via `gh repo list`, not
  guessed), titled "Personal Notion Site" instead of the raw repo
  name. Worth knowing: it's a forked Notion-to-GitHub-Pages template
  (using a tool called Loconotion), still carrying its default
  README — not something built from scratch. If you'd rather
  showcase a different project or title, edit `index.html` (marked
  `EDIT:`).
- **GitHub Activity** is now `github-activity.svg`, a downloaded
  snapshot of your real contribution graph from ghchart.rshah.org,
  self-hosted instead of loaded from that external URL. It's a
  static snapshot, not a live feed — refresh it any time by
  re-downloading `https://ghchart.rshah.org/0x0khalid` over the
  existing file.

## View counter

The eye icon next to your name shows a real, live page-view count,
via [hits.sh](https://hits.sh) — a free hit-counter badge service,
no signup needed. It's keyed to `0x0khalid.github.io` and increments
by one on every page load, anywhere the page is opened. This is the
one part of the site that genuinely can't be self-hosted as a static
file: a real counter needs a server keeping count somewhere, and
GitHub Pages has none.

hits.sh only returns an image badge (with a background box), not
plain text — every free, no-signup counter service tested has the
same limit, since browsers block reading a cross-origin count as raw
text unless the service explicitly allows it (CORS), and none of the
no-signup ones do. To still get jdhruv.dev's "no square, just a
number" look, `script.js` sets the badge's background color to
exactly match the page's own background (white in light mode,
`#060607` in dark mode) — hits.sh auto-picks a contrasting text
color for whatever background it's given, so the box's edges
disappear into the page and only the digits read as visible. The
script re-fetches the badge (without incrementing again) whenever
you toggle the theme, so it keeps matching whichever mode is active.

If you'd rather start clean, change the counter key in `script.js`
(`badgeUrl`) to anything unused (e.g. `0x0khalid-github-io-v2`) and
it resets to zero. Unlike jdhruv.dev's live-fetched activity graph
and Spotify integration, this counter is the one exception to
"no backend" on this page.

## Now Playing

The About panel's music widget is now a real Spotify embed (the
official `open.spotify.com/embed/track/...` iframe, fetched track
info via Spotify's public oEmbed API to confirm it resolves) — it
actually plays, not a static placeholder. Currently set to "وطني
العظيم" (track id `51FxGCq0VTXkC8R77FhXy2`). Swap the id in the
`src` URL in `index.html` to change the track.

## About text

Pasted directly (LinkedIn blocks unauthenticated scraping of profile
content, so this was the reliable path rather than fetching a URL).
Grammar-checked before it went in — no changes needed, it was already
correct.

## Preview locally

```bash
cd ~/0x0khalid.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish to GitHub Pages

This machine has no GitHub auth configured (no `gh` CLI, no SSH key), so I
built everything locally but couldn't push it. To publish:

1. Create an empty repo named exactly `0x0khalid.github.io` under your
   GitHub account (Settings → your profile → New repository — no README,
   no .gitignore, nothing pre-added).
2. From this folder, push what's already committed:

   ```bash
   cd ~/0x0khalid.github.io
   git remote add origin https://github.com/0x0khalid/0x0khalid.github.io.git
   git branch -M main
   git push -u origin main
   ```

3. GitHub Pages serves a `username.github.io` repo automatically from
   `main` — no extra config needed. It'll be live at
   `https://0x0khalid.github.io` within a minute or two.

If you'd rather I push it myself, install and authenticate the GitHub CLI
(`brew install gh && gh auth login`), or add an SSH key, and let me know —
I can take it from there.

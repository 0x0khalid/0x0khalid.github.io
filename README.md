# 0x0khalid.github.io

Personal homepage, closely modeled on jdhruv.dev's real layout: bordered
"screen-line" column with corner tick marks, diagonal-stripe section
dividers, hero with avatar + name + status, an About panel (bullet list)
with a Now Playing card, a Connect panel with six link pills, a GitHub
Activity panel, and collapsible Experience/Education timelines. Colors,
fonts (Geist / Geist Mono), spacing and the header/footer nav structure
(Home, Projects, More dropdown, search, theme toggle) are pulled from
jdhruv.dev's own compiled CSS and markup, not guessed.

One real difference: jdhruv.dev's pixel-style headings use Vercel's
custom "GeistPixel" typeface, which isn't publicly distributed. This
site approximates it with Geist Mono at a heavy weight instead.

## Fonts and icons — where they actually came from

- **Geist / Geist Mono** are self-hosted here as `fonts/Geist-Variable.woff2`
  and `fonts/GeistMono-Variable.woff2`, downloaded directly from Google
  Fonts' own font files (both are variable fonts, covering every weight
  400-900 in one file each). Earlier this loaded them from a
  `fonts.googleapis.com` `<link>` instead, which depends on two external
  origins (`fonts.googleapis.com` for the CSS, `fonts.gstatic.com` for
  the actual font binaries) both being reachable and unblocked in
  whatever browser or sandbox renders the page. Self-hosting removes
  that dependency entirely.
- **The camel** (`camel.svg`, used for the avatar-toggle and the footer
  mascot) is Twemoji's dromedary camel emoji, not hand-drawn — see
  [github.com/jdecked/twemoji](https://github.com/jdecked/twemoji).
  Graphics are licensed CC-BY 4.0 (Twitter, Inc and other contributors);
  keep that credit if you keep the icon.

## What's real vs. placeholder

Pulled from your actual X profile (`@5e9`, display name "Khalid") by
fetching the page source directly, not guessed:

- **Photo** — `pfp.jpg` is your real X profile photo (400×400), used
  for the hero avatar (the header keeps a plain "K" mark, matching how
  jdhruv.dev also keeps its header icon separate from the hero photo).
- **X/Twitter link** — corrected to `https://x.com/5e9`. The earlier
  version pointed at `x.com/0x0khalid`, which doesn't exist as an
  account (X returns "User Profile Not Found" for it).

X doesn't expose your bio text, location, or link without an
authenticated API call, so I couldn't pull those — only the photo,
handle, and display name were available from the public page.

Everything else is still a placeholder — search `index.html` for
`EDIT:` comments to find every spot to personalize:

- Hero subheading/role (currently "Software Engineer")
- Hero status line (currently "Building things")
- About section (3 bullet points — currently generic)
- Nav "Projects" link (points at `#experience` for now) and "More"
  dropdown items (currently empty placeholders)
- LinkedIn link (currently `#`, needs a real URL)
- Email link (currently `mailto:you@example.com`)
- Medium link (currently `#`)
- Resume link (currently `resume.pdf`, which doesn't exist yet — add the file or remove the link)
- Experience timeline (one placeholder entry)
- Education (one placeholder entry)
- Footer line ("Built with code and coffee")

The GitHub activity chart already points at the real `0x0khalid` GitHub
account via ghchart.rshah.org — no edit needed there unless the username
is wrong. Unlike jdhruv.dev's live-fetched contribution graph and real
Spotify/view-counter integrations, this is a static image and static
placeholders — there's no backend behind them.

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

# 0x0khalid.github.io

Personal homepage, structured after jdhruv.dev (hero, about, connect links,
GitHub activity, experience, education) with a custom dark/light theme.

## What's a placeholder right now

I didn't have your real bio, role, work history, education, or social links,
so these are placeholders — search the files for `EDIT:` comments to find
every spot to personalize:

- `index.html`
  - Hero subheading/role (currently "Software Engineer")
  - Hero status line (currently "Building things")
  - About section (3 paragraphs — currently generic)
  - X/Twitter link (currently points to `x.com/0x0khalid` — confirm it's right)
  - LinkedIn link (currently `#`, needs a real URL)
  - Email link (currently `mailto:you@example.com`)
  - Experience timeline (one placeholder entry)
  - Education (one placeholder entry)
  - Footer line ("Still building.")

The GitHub activity chart already points at the real `0x0khalid` GitHub
account via ghchart.rshah.org — no edit needed there unless the username
is wrong.

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

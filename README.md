# Mangesh Panchal — Portfolio

A single-page portfolio site. Plain HTML, CSS and JS, no build step, so it
runs directly on GitHub Pages.

## Files

```
index.html
css/style.css
js/main.js
```

## Before you publish

- In `index.html`, replace the placeholder email
  (`mailto:[email protected]`) with your real address, in both the
  `href` and the visible text.
- If you'd like a LinkedIn link, add another `.contact-link` next to the
  GitHub one in the Contact section.
- Swap in real project links: wrap each `<h3>` project name in the Work
  section with an `<a href="...">` tag once the repos or live demos are
  public.

## Deploy on GitHub Pages

1. Create a new repository on GitHub. If you want it at
   `https://mangeshgp14.github.io`, name the repo exactly
   `Mangeshgp14.github.io`. Any other name works too, it just publishes to
   `https://mangeshgp14.github.io/repo-name/` instead.
2. Push these files to the repository root (keep the `css/` and `js/`
   folders as they are):
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Mangeshgp14/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to the repo's **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a
   branch**, pick branch **main** and folder **/(root)**, then save.
5. GitHub will publish the site in a minute or two at the URL shown on
   that same Pages settings screen.

## Customizing

- Colors, type and spacing are all defined as CSS custom properties at the
  top of `css/style.css` under `:root` — change a value there and it
  updates everywhere it's used.
- The hero's fade-in sequence lives in the `@keyframes rise` rule; each
  element's delay is set inline next to its `animation` property.

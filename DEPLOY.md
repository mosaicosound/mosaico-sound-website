# Hostinger Deployment Guide

## Prerequisites
- Clean build in `dist/apps/web/client/`
- Access to Hostinger File Manager or FTP

## Steps

### 1. Clean the dist folder (already done)
The build folder should contain only these 11 files:
- `index.html`
- `__spa-fallback.html`
- `favicon.png`
- `robots.txt`
- `sitemap.xml`
- `assets/` folder (6 files: entry.client, home, index.css, jsx-runtime, root, studio)

### 2. Upload to Hostinger
**Via File Manager:**
1. Log into Hostinger control panel
2. Open File Manager → `public_html` (or your site's root folder)
3. **Delete all existing files** — especially old `.js` and `.css` files in `assets/`
4. Upload the entire contents of `dist/apps/web/client/` to `public_html/`

**Via FTP:**
1. Connect to your Hostinger FTP
2. Navigate to `public_html/`
3. Delete all existing files
4. Upload all files from `dist/apps/web/client/`

### 3. Verify
- Hard refresh your browser (Ctrl+Shift+R)
- Check the site loads correctly with the typewriter animation on "Across Mediums"

## Important
The key to a clean deployment is **removing old files first**. Stale asset files with old hash names will cause the site to load outdated code instead of the new build.

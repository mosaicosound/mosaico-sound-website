# MOSAICO SOUND Website — Project Context

## Project Overview
- **Project Name**: MOSAICO SOUND (independent sound practice for advertising, film, and games)
- **Project Root**: `C:\dev\Mosaico\horizons-export`
- **Web App Directory**: `apps/web/`
- **Live URL**: `https://sharp-paleturquoise-bat-64.hostingersite.com` (Hostinger demo/staging domain) — **DEPLOYED as of 2026-11-20 13:00**
- **Current build assets**: `manifest-8c4ad5a6.js`, `root-CxgDppCz.js`, `studio-771FVK48.js`, `home-CS1IiD7j.js`, `index-C7dtQ08B.css`, `entry.client-BeDUZwfJ.js`, `jsx-runtime-CvX5G2ys.js`
- **Domain**: `mosaicosound.com` (transferring, pending)
- **Package Name**: `mosaico-sound-web` (updated from `sonic-artisan-web`)

## Tech Stack
- **Framework**: React Router v8 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (minimal config, no shadcn/Radix UI)
- **Build Output**: `dist/apps/web/` (configured in `react-router.config.ts`)
- **SSR**: Disabled (static site)
- **Key Dependencies**: React 19, Lucide React icons (only 5 packages total — all bloat removed)

## Hostinger Deployment Setup

### Deployment Workflow (✅ WORKING — Manual PowerShell FTP)
- **GitHub Actions**: ❌ **BROKEN** — `SamKirkland/FTP-Deploy-Action` rejects Hostinger FTP sub-account credentials. 10+ failed runs. Do NOT try to fix this.
- **Working method**: Manual PowerShell FTP upload (proven working as of 2026-11-20).
- **How to deploy**:
  1. Build: `cd "C:\dev\Mosaico\horizons-export" ; npm run build`
  2. Upload via PowerShell FTP script (see below)
  3. Clean stale assets from `assets/` folder on server
- **FTP credentials**: Server `157.173.209.67`, port `21`, user `u370713035`, password `REDACTED`
- **FTP path**: `domains/sharp-paleturquoise-bat-64.hostingersite.com/public_html/`
- **PowerShell FTP upload script**:
  ```powershell
  $localDir = "C:\dev\Mosaico\horizons-export\dist\apps\web\client"
  $ftpServer = "157.173.209.67"
  $username = "u370713035"
  $password = "REDACTED"
  $basePath = "ftp://$ftpServer/domains/sharp-paleturquoise-bat-64.hostingersite.com/public_html/"
  $creds = New-Object System.Net.NetworkCredential($username, $password)
  $files = Get-ChildItem -Path $localDir -File -Recurse
  foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($localDir.Length + 1) -replace '\\','/'
    $ftpUrl = "$basePath$relativePath"
    $req = [System.Net.FtpWebRequest]::Create($ftpUrl)
    $req.Credentials = $creds
    $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $req.UsePassive = $true
    $req.ContentLength = $file.Length
    $stream = $req.GetRequestStream()
    $fileStream = $file.OpenRead()
    $fileStream.CopyTo($stream)
    $stream.Close()
    $fileStream.Close()
    $req.GetResponse() | Out-Null
  }
  ```
- **Important**: After uploading, delete stale asset files (old hash names) from the server's `assets/` folder.

### Hosting Plan
- **Plan**: Hostinger Premium (shared hosting)
- **SFTP Access**: Configured (port 65002, user u370713035, IP 157.173.209.67)
- **Web Root**: `public_html`
- **Critical Limitation**: SSH account is **SFTP-only** (`/sbin/nologin`) — **NO shell command execution possible**. Any GitHub Action that tries to run shell commands will fail.
- **Important**: Shared hosting does NOT run build commands like `npm run build` automatically on the server

### Hostinger SFTP Credentials
- **Server IP**: `157.173.209.67`
- **Port**: `65002` (SFTP) / `21` (FTP)
- **Username**: `u370713035`
- **Password**: `REDACTED`
- **Access type**: SFTP only (no shell — `/sbin/nologin`)

### Git Setup Status
- **Git Installed**: Yes
- **GitHub Repository**: ✅ `https://github.com/mosaicosound/mosaico-sound-website`
- **GitHub Actions**: ❌ **BROKEN** — Do NOT try to fix. Use manual PowerShell FTP instead.
- **Domain**: `mosaicosound.com` (transferring, pending)

## Project Structure
```
horizons-export/
├── apps/
│   └── web/                    # Main website application
│       ├── src/               # Source code
│       │   ├── components/home/studio.tsx  # All page components (Hero, Portfolio, Partners, Hello, Footer)
│       │   ├── copy.ts        # All website text
│       │   ├── index.css      # All styles (~1300 lines)
│       │   ├── root.tsx       # App root + header + footer + theme toggle
│       │   ├── routes/home.tsx # Page layout
│       │   └── ...            # Entry points, hooks, lib
│       ├── package.json       # Dependencies (5 packages)
│       ├── vite.config.ts     # Build configuration
│       └── react-router.config.ts  # React Router config (SSR: false)
├── dist/                      # Build output (generated, in .gitignore)
├── node_modules/              # Dependencies (generated, in .gitignore)
├── .gitignore                 # Files to exclude from Git
├── .github/workflows/deploy.yml  # GitHub Actions auto-deploy (BROKEN)
└── .junie/                    # Junie AI session context (this folder)
```
**Removed**: `apps/pocketbase/` (entire directory), `plugins/` (80+ template files), `components/ui/` (50+ shadcn files), unused hooks, lib files, config files.

## Design Decisions & Current State (as of 2026-11-20 13:00)

### Overall Aesthetic: Cathedral Mosaic + Hand-Drawn Sketch
- **Core concept**: The website combines two visual languages:
  1. **Cathedral stained glass mosaic**: Deep jewel tones (cobalt, ruby, emerald, gold, amethyst) on near-pure black background — like light piercing through stained glass in a dark cathedral.
  2. **Hand-drawn sketch**: Wavy SVG pen-stroke dividers — like quick pencil notes in a sketchbook.
- **Ink color**: `#020203` (near-pure black) with `--ink-light: #0d0d10` as secondary dark tone.
- **Paper color**: `#e8e6e1` (aged paper).
- **Pure CSS implementation**: All effects use layered gradients, pseudo-elements, SVG data-URIs, and text shadows — no JavaScript or external libraries for styling, well within Hostinger Premium limits.

### Light Mode (Default Theme)
- **Default**: Light mode is the default theme (changed from dark).
- **Toggle**: Sun/moon icon button in header next to navigation.
- **What changes in light mode**:
  - Background: near-black (`#020203`) → warm off-white (`#f5f4f0`)
  - Text: light (`#e8e6e1`) → dark (`#1a1a1a`)
  - Wavy divider strokes: light pearl → warm taupe (`rgba(160,155,145, X)`)
  - Mobile menu: dark overlay → light overlay
  - Cookies dialog and empty states adapt
- **What stays the same**: All stained glass splashes (cobalt, ruby, emerald, gold, amethyst), wavy SVG dividers, Raleway Light font, pearl shimmer on headings, stained glass gradient hover effects, scratch marks and ink splatter details.
- **User preference saved**: Toggle remembers choice in `localStorage`.

### Typography — Raleway Light (Elegant Sans-Serif)
- **Font choice**: **Raleway** (Google Fonts, free, weight 300 Light) — elegant, refined sans-serif with thin strokes.
- **Applied to**: EVERYTHING on the site — all headings, body text, `.brand`, navigation, buttons, section labels, `.mono` text, portfolio categories, footer, cookies dialog, mobile menu links.
- **CSS variable**: `--font-sketch: 'Raleway', sans-serif`
- **Font loaded via**: `root.tsx` Google Fonts link in `<head>` (not via @import in CSS, which doesn't work with Vite).
- **Key styling**:
  - `h1`: `clamp(36px, 5vw, 72px)`, weight 400, italic, letter-spacing 0.02em, max-width 900px.
  - `h2`: `clamp(40px, 5vw, 72px)`, weight 400, italic, letter-spacing 0.02em.
  - `h3`: 32px, weight 400, italic, letter-spacing 0.02em.
  - `.brand`: 30px, weight 400.
  - Body paragraphs: weight 400, line-height 1.8-1.9.
- **Design evolution**: Cormorant Garamond → Amatic SC → Shadows Into Light → Patrick Hand → Playfair Display → Jost → Sofia Sans Pro → **Raleway Light** (current). User wanted more elegance without being too polished.

### Hero Section — Compact
- **Headline**: `Sonic Artistry Across Mediums` (single line, no `<em>` split)
- **Full headline**: Pearl shimmer effect — slow gradient animation with soft iridescent colors (`pearl-shimmer 8s ease-in-out infinite`).
- **Eyebrow**: Empty string — "Independent sound practice" line removed.
- **Subheading**: "Precision in the edit. Emotion in the mix. Distinctive sound for stories, brands and worlds."
- **Removed elements**: No typewriter animation, no cursor, no DAW playhead canvas, no "Explore the work" button, no caption line, no "SCROLL TO DISCOVER" link, no decorative divider.
- **Hero sizing**: Compact — padding `24px 5% 16px` (desktop), auto min-height. Mobile: padding `16px`, min-height `500px`.

### Page Layout Order (home.tsx) — AndSo-Inspired Flow
- **Current order**: Hero → Portfolio (Work) → Partners → Hello
- **Navigation**: Streamlined to 2 links only — "Work" (scrolls to portfolio) and "About" (scrolls to Hello section).
- **Removed sections**:
  - **Services** — completely removed (component, copy, navigation link)
  - **Contact form** — replaced by Hello section with simple email link
  - **Newsletter** — completely removed (component, copy, CSS)
  - **About** — replaced by Hello section as warm closing CTA
  - **Journal/Studio Notes** — completely removed
  - **Signal Demo** — audio tone button removed
- **Partners section**: Client logos grid with placeholder names (Client One, Client Two, etc.) — user can replace with real client names.
- **Hello section**: Warm closing CTA with "Let's make something beautiful." heading, subheading, and email link (hello@mosaicosound.com). Replaces formal contact form.
- **Footer**: Two-row layout — top row has brand + email link, bottom row has tagline + cookie button + copyright.
- **Inspiration**: https://andso.ca/ — minimal nav (Work + About), linear scroll flow, work-first approach, warm closing "Hello" moment instead of formal contact page.
- **Section spacing**: `padding: 40px 5%` — sections sit closer together.

### Multicolor Splashes (Hero Background Only)
- **Hero background** (`.hero::before`): Radial gradient splashes using deep stained glass palette (cobalt, ruby, emerald, gold, amethyst) at 12-25% opacity.
- **Splash pulse animation**: 6s cycle — opacity 0.08 to 0.25, saturate 0.1 to 0.7.
- **Reduced glows**: User prefers darker, more matte look — splash base opacity at 0.08, max pulse at 0.25.

### Wavy SVG Pen-Stroke Dividers
- **All dividers** use stacked wavy SVG lines — like quick pen strokes in a notebook.
- **Technique**: SVG data-URI with quadratic bezier curves (`Q50`), 3-5 stacked layers with slight vertical offset and decreasing opacity (0.35 → 0.1).
- **Light mode**: Wavy dividers use warm taupe tones (`rgba(160,155,145, X)`) instead of harsh dark ink.
- **Interactive elements**: Portfolio filter chips reveal stained glass gradient colors on hover.
- **Mobile menu**: Wavy pen-loop underlines with stained glass gradient on hover. Light mode hover also shows multicolored gradients.

### Gradient Styling — Deep Stained Glass Palette
- **`--accent-gradient`**: `linear-gradient(90deg, #1e50a8, #a82040, #1a8a5a, #c8a430, #6a3090)` (cobalt → ruby → emerald → gold → amethyst)
- **Color palette**:
  - `#1e50a8` **Cobalt** — deep blue like Chartres Cathedral glass
  - `#a82040` **Ruby** — rich red like stained glass garnet
  - `#1a8a5a` **Emerald** — forest green like ancient mosaic tiles
  - `#c8a430` **Gold** — warm light piercing through glass
  - `#6a3090` **Amethyst** — deep purple like cathedral twilight

### Mobile Menu (Hamburger Button)
- **Location**: `root.tsx` — hamburger button inside `<nav>`, full-screen menu overlay outside `<header>`.
- **Trigger**: Hamburger icon (3 lines → X animation) visible only on mobile (`max-width: 760px`).
- **Menu links**: 2 links (Work, About) with staggered fade-in animation.
- **Link styling**: Pearl color by default, stained glass gradient + wavy underline on hover.
- **Hamburger button**: Circular 36x36px style matching theme toggle button.
- **Body scroll lock**: `body:has(.mobile-menu) { overflow: hidden }` prevents background scrolling when menu is open.

## Copy Management System (copy.ts)
- **File**: `apps/web/src/copy.ts` — **ALL website text is centralized here.**
- **How it works**: Every component imports `siteCopy` from `@/copy` and reads text from it.
- **How to edit**: Open `copy.ts`, find the section, edit the text. Save and the site updates.
- **Structure**: `siteCopy` object has properties: `header`, `hero`, `portfolio`, `partners`, `hello`, `footer`, `cookies`.
- **Adding projects**: Edit `siteCopy.portfolio.projects` array.
- **Line breaks**: Use `\n` inside strings for line breaks.
- **Do NOT edit text in `studio.tsx` or `root.tsx`** — all text should come from `copy.ts`.

## Important Notes for Future Sessions
- **DO NOT DELETE THIS FILE** — This AGENTS.md contains critical project context. Always preserve it.
- User has **Hostinger Premium plan** — does NOT want to spend extra money on services
- **✅ DEPLOYMENT**: Manual PowerShell FTP upload works. GitHub Actions is broken — do NOT waste time on it.
- **Hostinger SFTP**: SFTP-only access (no shell — `/sbin/nologin`). FTP on port 21 works with PowerShell but NOT with GitHub Actions.
- **Hostinger credentials**: IP `157.173.209.67`, FTP port `21`, user `u370713035`, password `REDACTED`
- **FTP server-dir path**: `/domains/sharp-paleturquoise-bat-64.hostingersite.com/public_html/` (not `/public_html/`)
- **Repository is public**: https://github.com/mosaicosound/mosaico-sound-website
- **Domain**: `mosaicosound.com` (transferring, pending)
- **Current aesthetic**: Cathedral stained glass mosaic + hand-drawn sketch. Deep jewel tones, Raleway Light font, wavy SVG dividers.
- **Light mode**: Default theme with toggle button. All effects preserved.
- **Page flow**: AndSo-inspired — Hero → Work → Partners → Hello. Minimal nav (Work + About only).
- **User prefers minimal, concise UI** — removes labels, captions, and decorative elements. Wants eye to go directly to the work.
- **Project cleanup**: All template bloat removed. Only 5 npm packages. No shadcn, no Radix UI, no Framer Motion, no Three.js. Pure CSS animations.
- **Backup folder**: `C:\dev\Mosaico\Backups\` — always create backups before major changes.

## Quick Commands Reference
```powershell
# Build the project
cd "C:\dev\Mosaico\horizons-export"
npm run build

# Run local preview server
cd "C:\dev\Mosaico\horizons-export\apps\web"
npm run dev

# Commit and push changes
cd "C:\dev\Mosaico\horizons-export"
git add .
git commit -m "Your changes description" --trailer "Co-authored-by: Junie <junie@jetbrains.com>"
git push

# Create backup
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm"
Compress-Archive -Path "C:\dev\Mosaico\horizons-export\*" -DestinationPath "C:\dev\Mosaico\Backups\mosaico-backup-$timestamp.zip" -Update
```

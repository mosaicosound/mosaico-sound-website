# MOSAICO SOUND Website — Project Context

## Project Overview
- **Project Name**: MOSAICO SOUND (independent sound practice for advertising, film, and games)
- **Project Root**: `C:\dev\Mosaico\horizons-export`
- **Web App Directory**: `apps/web/`
- **Live URL**: `https://sharp-paleturquoise-bat-64.hostingersite.com` (Hostinger demo/staging domain)
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

### ✅ DEPLOYMENT WORKFLOW — FIXED (as of 2026-11-20)
**Solution**: Switched from SFTP to **FTP protocol** with `SamKirkland/FTP-Deploy-Action@v4.3.5`. FTP does not require shell access, so it works with Hostinger's `/sbin/nologin` restriction. Old SFTP/SCP actions all failed because they required shell-level access.
- **Key setting**: `cleanup: true` — automatically deletes old build files not in the new build, solving the asset accumulation problem.
- **Protocol**: FTP on port 21 (not SFTP on port 65002).
- **Why it works**: FTP is a simpler protocol that only needs authentication and file transfer — no shell commands, no extraction, no SCP handshake.

### 🔴 Deployment Investigation (2026-11-20)
**Problem**: Every GitHub Actions workflow run fails at the "Upload build to Hostinger" step. The build steps (checkout, Node.js setup, npm ci, npm run build) all succeed. The upload step is the only failure point.

**Total workflow runs**: 10+ failed runs since repository creation. All builds succeed, all uploads fail.

**What was tried (all failed) — with precise error details:**

1. **`wepanda改造/scp-sftp-action@v1.3.0`** (Original corrupted action)
   - **Status**: FAILED — File encoding corruption.
   - **Error**: Chinese characters `改造` in the action name caused parsing failures. This was the original action in the file, likely a copy-paste error from a Chinese fork.
   - **Commit**: Replaced in `258663a3`.

2. **`wlixcc/SFTP-Deploy-Action@v1.2.6` with `sftp_only: true`**
   - **Status**: FAILED — Unzip/extract error.
   - **Error**: The action attempted to unzip/extract files on the server side, which requires shell access. Hostinger's `/sbin/nologin` blocked the extraction command.
   - **Timeline**: Tried after replacing the corrupted action. Failed within seconds.
   - **Commit**: `258663a3` pushed this action, then replaced in `3967c113`.

3. **`wangyucode/sftp-upload-action@v3`** (Python-based SFTP)
   - **Status**: FAILED — Connection or upload failure.
   - **Error**: The action failed to complete the upload. While Python-based and claiming no shell requirement, it still could not establish a working SFTP session with Hostinger's configuration.
   - **Timeline**: Tried as an alternative to wlixcc action.
   - **Commit**: `3967c113` pushed this action, then replaced in `daa0dbd0`.

4. **`appleboy/scp-action@v0.1.7`** (SCP protocol)
   - **Status**: FAILED — SCP requires SSH shell access.
   - **Error**: SCP protocol failed in ~4 seconds with connection rejected. While SCP is different from SFTP, Hostinger's `/sbin/nologin` blocks SCP protocol even though interactive SFTP clients (like FileZilla) work. The SCP protocol handshake requires shell-level access that `/sbin/nologin` denies.
   - **Timeline**: Restored in `daa0dbd0` based on the assumption that previous agents used it successfully. However, investigation revealed those "successful deployments" were actually **manual uploads via Hostinger File Manager**, not automated GitHub Actions.
   - **Key insight**: Previous agents did NOT successfully automate deployment via GitHub Actions. They manually uploaded files through Hostinger's File Manager and deleted old assets manually.

5. **`SamKirkland/FTP-Deploy-Action@v4.4.0` with `protocol: sftp`**
   - **Status**: FAILED — SFTP support dropped in v4.
   - **Error**: "Failed to connect, are you sure your server works via FTP or FTPS? Users sometimes get this error when the server only supports SFTP." The action's owner explicitly states v4 dropped SFTP support. The error message is misleading — it's not that the server doesn't work, it's that the action no longer supports SFTP.
   - **Commit**: `ba5f6360` pushed this action.

**Why this is hard**: Hostinger Premium provides SFTP access on port 65002, but the SSH account has `/sbin/nologin` (no shell). This creates a catch-22:
- **Interactive SFTP clients** (FileZilla, WinSCP) work fine — they use the SFTP subsystem directly.
- **Automated SFTP actions** fail because they either:
  - Require shell access for extraction/commands (blocked by `/sbin/nologin`)
  - Use SCP protocol instead of SFTP (blocked by `/sbin/nologin`)
  - Dropped SFTP support entirely (FTP-Deploy-Action v4)
  - Fail to establish proper SFTP session (wangyucode action)

**Next steps for future agents:**
1. **Try FTP protocol**: Hostinger Premium supports FTP (separate from SFTP). Use `SamKirkland/FTP-Deploy-Action@v4.3.5` with `protocol: ftp` (not sftp). Configure deploy.yml:
   ```yaml
   - name: Upload build to Hostinger
     uses: SamKirkland/FTP-Deploy-Action@v4.3.5
     with:
       server: 157.173.209.67
       username: u370713035
       password: A@Cu%kb8!Qcg^@7MymCY
       local-dir: dist/apps/web/client/
       server-dir: /public_html/
       protocol: ftp
       port: 21
   ```
   **Note**: FTP uses port 21, not 65002 (which is SFTP-only). If port 21 is blocked, try without specifying port.

2. **Check GitHub Actions logs**: Repository is now public. View runs at https://github.com/mosaicosound/mosaico-sound-website/actions. All 10+ runs show the same pattern: build succeeds, upload fails.

3. **If FTP fails**: The only remaining option is to ask Hostinger support to enable full SSH access (not SFTP-only) on the Premium plan, or consider migrating to a static site host (Netlify/Vercel) that handles builds natively.

### Hosting Plan
- **Plan**: Hostinger Premium (shared hosting)
- **SFTP Access**: Configured (port 65002, user u370713035, IP 157.173.209.67)
- **Web Root**: `public_html`
- **Critical Limitation**: SSH account is **SFTP-only** (`/sbin/nologin`) — **NO shell command execution possible**. Any GitHub Action that tries to run shell commands (like `appleboy/ssh-action`) will fail with `/sbin/nologin: No such file or directory`.
- **Important**: Shared hosting does NOT run build commands like `npm run build` automatically on the server

### Hostinger SFTP Credentials
- **Server IP**: `157.173.209.67`
- **Port**: `65002`
- **Username**: `u370713035`
- **Password**: `A@Cu%kb8!Qcg^@7MymCY`
- **Access type**: SFTP only (no shell — `/sbin/nologin`)

### Deployment Workflow (✅ FIXED — FTP Protocol Works)
- **Workflow file**: `.github/workflows/deploy.yml`
- **Current state**: **Fixed** — workflow uses FTP protocol via `SamKirkland/FTP-Deploy-Action@v4.3.5`.
- **Solution**: FTP protocol (port 21) does not require shell access, unlike SFTP/SCP which are blocked by `/sbin/nologin`.
- **Cleanup**: `cleanup: true` automatically removes old build assets, preventing file accumulation.
- **What works**: Checkout, Node.js setup, `npm ci`, `npm run build`, FTP upload — all succeed.

### Git Setup Status
- **Git Installed**: Yes
- **GitHub Repository**: ✅ `https://github.com/mosaicosound/mosaico-sound-website`
- **GitHub Actions**: ✅ Workflow fixed — uses FTP protocol with automatic cleanup of old files
- **Domain**: `mosaicosound.com` (transferring, pending)

### Why This Deployment Method
- **Root Cause of Old Issues**: Hostinger's File Manager does NOT automatically delete old files when uploading new builds. Hashed assets from previous builds accumulate.
- **FTP Solution**: Upload fresh build files via FTP with `cleanup: true`. The action automatically deletes old files not present in the new build, solving the accumulation problem completely.
- **No Manual File Uploads**: Never use File Manager for deployments.

## Known Issues & Resolved Problems

### Resolved: Old "Sonic Artisan" Build Served
- **Problem**: After initial deployment, Hostinger was serving an old "Sonic Artisan" build instead of the new MOSAICO SOUND site.
- **Solution**: Hostinger support updated the homepage entry file and cleared caches.

### Resolved: Build Asset Hash Mismatch
- **Problem**: After deployment, `index.html` referenced old build asset hashes instead of new ones.
- **Root Cause**: 9 inactive asset files from the old build remained on the server.
- **Old Build Files**: `manifest-ac679203.js`, `entry.client-5WfssKWE.js`, `root-BeqhiGv8.js`
- **New Build Files**: `manifest-6b878464.js`, `entry.client-BeDUZwfJ.js`, `root-BQEi_nYr.js`
- **Solution**: User manually deleted the 9 inactive files from the server's `assets` folder.
- **Prevention**: Git-based deployment will prevent this in the future by replacing all files.

### Resolved: Package Name Mismatch
- **Problem**: `package.json` had `"name": "sonic-artisan-web"` (old project name)
- **Solution**: Updated to `"name": "mosaico-sound-web"`

## Project Structure
```
horizons-export/
├── apps/
│   └── web/                    # Main website application
│       ├── src/               # Source code (11 files, all actively used)
│       │   ├── components/home/studio.tsx  # All page components
│       │   ├── copy.ts        # All website text
│       │   ├── index.css      # All styles (~1050 lines)
│       │   ├── root.tsx       # App root + header + footer
│       │   ├── routes/home.tsx # Page layout
│       │   └── ...            # Entry points, hooks, lib
│       ├── package.json       # Dependencies (5 packages)
│       ├── vite.config.ts     # Build configuration
│       └── react-router.config.ts  # React Router config (SSR: false)
├── dist/                      # Build output (generated, in .gitignore)
├── node_modules/              # Dependencies (generated, in .gitignore)
├── .gitignore                 # Files to exclude from Git
├── DEPLOY.md                  # Hostinger deployment guide
├── .github/workflows/deploy.yml  # GitHub Actions auto-deploy
└── .junie/                    # Junie AI session context (this folder)
```
**Removed**: `apps/pocketbase/` (entire directory), `plugins/` (80+ template files), `components/ui/` (50+ shadcn files), unused hooks, lib files, config files.

## Design Decisions & Current State (as of 2026-11-20)

### Overall Aesthetic: Cathedral Mosaic + Hand-Drawn Sketch
- **Core concept**: The website combines two visual languages:
  1. **Cathedral stained glass mosaic**: Deep jewel tones (cobalt, ruby, emerald, gold, amethyst) on near-pure black background — like light piercing through stained glass in a dark cathedral.
  2. **Hand-drawn sketch**: Shadows Into Light handwritten font + wavy SVG pen-stroke dividers — like quick pencil notes in a sketchbook.
- **Ink color**: `#020203` (near-pure black) with `--ink-light: #0d0d10` as secondary dark tone.
- **Paper color**: `#e8e6e1` (aged paper).
- **Pure CSS implementation**: All effects use layered gradients, pseudo-elements, SVG data-URIs, and text shadows — no JavaScript or external libraries for styling, well within Hostinger Premium limits.

### Background Texture (body::before)
- A fixed overlay covers the entire viewport with:
  - **SVG noise texture**: `feTurbulence` filter (baseFrequency 0.85, 4 octaves) for authentic newspaper grain at 12% opacity.
  - **Stained glass glow**: 5 organic radial gradient patches (cobalt, ruby, emerald, gold, amethyst at 0.1-0.15 opacity) — cathedral light patches.
  - **Black void splashes**: 9 radial gradients (rgba(0,0,0) at 0.5-0.9 opacity) scattered across the viewport — like dark corners of a cathedral where light barely reaches.
  - **Paper fiber lines**: Very subtle repeating gradients (0.008 opacity horizontal, 0.005 opacity vertical).
  - **Ink splatter dots**: 7 tiny radial gradients (4-6% opacity) scattered across the surface.
- Content elements (`.site-header`, `.hero`, `.section`, `.newsletter`, `footer`) sit above via `position: relative; z-index: 1;`

### Typography — Shadows Into Light (Handwritten Sketch)
- **Font choice**: **Shadows Into Light** (Google Fonts, free) — thin, delicate handwritten font, like a fine-tip pen on paper.
- **Applied to**: EVERYTHING on the site — all headings (h1, h2, h3), body text, `.brand`, navigation, buttons, section labels, `.mono` text, service numbers, portfolio categories, contact info, form labels and inputs, newsletter, footer, cookies dialog, mobile menu links.
- **CSS variable**: `--font-sketch: 'Shadows Into Light', cursive`
- **Font loaded via**: `root.tsx` Google Fonts link in `<head>` (not via @import in CSS, which doesn't work with Vite).
- **Key styling**:
  - `h1`: `clamp(52px, 7.5vw, 110px)`, weight 400, italic, letter-spacing 0.02em, max-width 900px.
  - `h2`: `clamp(40px, 5vw, 72px)`, weight 400, italic, letter-spacing 0.02em.
  - `h3`: 32px, weight 400, italic, letter-spacing 0.02em.
  - `.brand`: 30px, weight 400.
  - Body paragraphs: weight 400, line-height 1.8-1.9.
  - Labels/captions: 13-16px, weight 400, no uppercase transform.
- **Design evolution**: Started with Cormorant Garamond (elegant serif) → user wanted scribbly feel → tried Amatic SC (too extreme) → rolled back → settled on Shadows Into Light for subtle sketchiness. Cormorant Garamond, Architects Daughter, and Inter fonts were removed.

### Hero Section — "Sonic Artistry Across Mediums"
- **Headline**: `Sonic Artistry Across Mediums` (single line, no `<em>` split)
- **Full headline**: Pearl shimmer effect — slow gradient animation with soft iridescent colors (`pearl-shimmer 8s ease-in-out infinite`).
- **Eyebrow**: Empty string — "Independent sound practice" line removed. Hero section is compact.
- **Subheading**: "Precision in the edit. Emotion in the mix. Distinctive sound for stories, brands and worlds." — stays still, no jumping.
- **"mosaico sound"** in header/footer: Simple static `var(--accent-gradient)`.
- **Removed elements**: No typewriter animation, no cursor, no DAW playhead canvas, no "Explore the work" button, no caption line, no "SCROLL TO DISCOVER" link, no decorative divider.
- **Hero sizing**: Compact — padding `24px` (desktop), min-height `calc(100dvh - 200px)`. Mobile: padding `16px`, min-height `500px`.

### Hero Section — Removed Animations
- **Typewriter animation**: Completely removed. The inconsistent width-based typewriter with overflow:hidden clipping was replaced with a static pearl shimmer gradient.
- **Blinking cursor**: Removed. The cursor was inconsistent and tied to the typewriter cycle.
- **DAW SonicScene canvas**: Completely removed. The canvas component (~145 lines) that drew waveform tracks and playhead has been deleted from `studio.tsx`.
- **TV signal glitch**: Experimented with TV static/scanlines effect on "Mediums" — user didn't see the design, so the entire idea was killed.
- **Spider-Verse glitch**: Briefly tried RGB channel splitting on "Mediums" — then reverted to match "Sonic Artistry" pearl shimmer.
- **Current state**: Clean hero with static text and pearl shimmer gradient only. No canvas, no glitch, no typewriter, no playhead.

### Multicolor Splashes (Hero Background Only)
- **Hero background** (`.hero::before`): Radial gradient splashes using deep stained glass palette (cobalt, ruby, emerald, gold, amethyst) at 12-25% opacity.
- **Splash pulse animation**: 6s cycle — opacity 0.08 to 0.25, saturate 0.1 to 0.7.
- **Section transitions**: Removed — no `.section::before` splash accents.
- **Shimmer lines**: Removed — all 5 `.shimmer-line` divider elements deleted from components.
- **Reduced glows**: User prefers darker, more matte look — splash base opacity at 0.08, max pulse at 0.25.

### Wavy SVG Pen-Stroke Dividers
- **All dividers** use stacked wavy SVG lines — like quick pen strokes in a notebook:
  - Header bottom (`.site-header::after`) — stained glass gradient (not wavy, clean ink brush)
  - Section bottom (`.section::after`) — 3 stacked wavy lines
  - Standalone hero-to-portfolio divider (`.section-divider`) — 3 stacked wavy lines
  - Service separators (`.service::before`, `.service::after`) — wavy lines with stained glass gradient on hover
  - Portfolio filter chips (`.chips button::after`) — wavy line with stained glass gradient on hover
  - Audio project dividers (`.audio-project::before`) — wavy lines
  - Journal vertical line (`details.service p::before`) — vertical wavy stroke
  - Contact item separators (`.contact-item::before`) — wavy lines
  - Form input underlines (`input::after`) — wavy line, pearl default, stained glass on focus
  - Newsletter bottom (`.newsletter::after`) — **REMOVED** to keep footer clean
  - Footer top (`footer::before`) — stained glass gradient (not wavy, clean ink brush)
  - Nav contact link (`.nav-contact::after`) — wavy line with stained glass gradient on hover
- **Technique**: SVG data-URI with quadratic bezier curves (`Q50`), 3-5 stacked layers with slight vertical offset and decreasing opacity (0.35 → 0.1). Each layer is a smooth, consistent curve; the sketchy density comes from layering, not irregularity.
- **Interactive elements**: Services, chips, inputs, nav-contact reveal stained glass gradient colors on hover/focus.
- **Design evolution**: Started with Chinese ink brush strokes → user wanted scribbly feel → tried irregular shaky paths (looked horrible) → settled on clean stacked wavy lines. Footer and header keep clean stained glass gradient lines for consistency.

### Button Design — Clean with Wavy Underline
- **Buttons** (`.nav-contact`, `.chips button`): Transparent background, no borders.
- **Hover effect**: Stained glass gradient text + wavy SVG underline (`::after`).
- **Underline**: Wavy pen-stroke style, fades in over 0.4s.
- **Removed**: `.primary` button class — "Explore the work" CTA button removed from hero.
- **Design evolution**: Started with sketchy borders → coffee-stain splashes → Chinese ink blob → thin underline → wavy SVG pen stroke.

### Gradient Styling — Deep Stained Glass Palette
- **`--accent-gradient`**: `linear-gradient(90deg, #1e50a8, #a82040, #1a8a5a, #c8a430, #6a3090)` (cobalt → ruby → emerald → gold → amethyst)
- **`--accent-gradient-animate`**: Same + `#1e50a8` at end for seamless loop.
- **`--accent-color`**: `#1e50a8` (cobalt blue).
- **Applies to**: Hero text shimmer, header/footer branding, section labels, link hovers, nav contact button, chip buttons, contact mono text, empty state SVG, form focus states, service hover reveal, mobile menu underlines.
- **Color palette**:
  - `#1e50a8` **Cobalt** — deep blue like Chartres Cathedral glass
  - `#a82040` **Ruby** — rich red like stained glass garnet
  - `#1a8a5a` **Emerald** — forest green like ancient mosaic tiles
  - `#c8a430` **Gold** — warm light piercing through glass
  - `#6a3090` **Amethyst** — deep purple like cathedral twilight
- **Design evolution**: Started with soft pastel rainbow (#c9a0dc, #88aaff, #88ffaa, #ffcc88, #ff88aa) → user wanted cathedral mosaic → Deep Stained Glass jewel tones selected.

### Scratch Marks & Ink Effects
- **h1::after, h2::after**: Scratch lines and ink splatter dots around headings via pseudo-elements.
- **Service dividers**: Wavy SVG lines with stained glass gradient hover reveal (`.service::before`, `.service::after`).
- **Contact section**: SVG noise texture overlay + stained glass glow (`.contact::before`).
- **Journal accordion**: Wavy vertical line beside text (`details.service p::before`).
- **Contact items**: Wavy dividers above each item (`.contact-item::before`).
- **Empty state**: Rough scratched border (`.empty::before`).
- **Cookies dialog**: Rough scratched border (`.cookies::before`).

### "feel" Word Animations (REMOVED)
- **Status**: Completely removed during project cleanup (2026-11-19).
- **What was removed**: The 4-effect sequencer (Shiver, Explode, Font Change, Typewriter), the `useFeelSequencer` hook, `FEEL_EFFECTS` config array, and all related CSS keyframes (~150 lines).
- **Replaced by**: None — all hero animations (typewriter, DAW playhead, TV glitch, Spider-Verse glitch) have been removed. Hero is clean with static pearl shimmer gradient only.

### Mobile Menu (Hamburger Button)
- **Location**: `root.tsx` — hamburger button inside `<nav>`, full-screen menu overlay outside `<header>` (to avoid CSS stacking context clipping).
- **Trigger**: Hamburger icon (3 lines → X animation) visible only on mobile (`max-width: 760px`).
- **Menu overlay**: Full-screen fixed overlay with solid black background (`#020203`), z-index 1000.
- **Menu links**: 4 links (Work, Services, About, Contact/Let's talk) with staggered fade-in animation (0.15s–0.5s delays).
- **Link styling**: Subtle pearl color by default (50% opacity), on hover/tap fill with stained glass gradient + wavy pen-loop underline.
- **Underline style**: Wavy SVG pen stroke (quick pen loop style) with stained glass gradient colors on hover — same as the scribbly dividers.
- **Tap feedback**: `scale(0.97)` + `brightness(1.3)` on `:active` state for immediate touch feedback.
- **Auto-close**: Menu closes when a link is clicked.
- **Design evolution**: Started as transparent dropdown (invisible) → cinema-style reveal with colored spotlights → solid black overlay with pearl links → Chinese ink brush hover style → wavy pen-loop underlines with stained glass gradient on hover.
- **Key CSS fix**: Menu must be a sibling of `<header>` (not a child) for `position: fixed` to work correctly — header's `position: relative` creates a stacking context that clips fixed children.

### Page Layout Order (home.tsx)
- **Current order**: Hero → Portfolio → Services → About → Contact → Newsletter
- **Removed sections**: 
  - **Journal/Studio Notes** — completely removed (component, copy, navigation link, route import)
  - **Signal Demo** — audio tone button removed (component, copy, CSS)
- **Portfolio**: Appears immediately after Hero, with a standalone wavy divider line (`.section-divider`) between Hero and Portfolio.
- **Cinema lights effect**: Briefly added dark overlay with colored spotlights when scrolling to Portfolio — user couldn't see the changes, so the effect was dropped.
- **Section spacing**: `padding: 60px 5%` (reduced from `105px 5%`) — sections sit closer together.
- **No decorative dividers**: Shimmer lines between sections removed.

### Color Palette Evolution
- Started with vibrant rainbow (ruby, amber, teal, cobalt, purple, magenta)
- Explored stained glass mosaic effects (12-shard cathedral, 36-shard watercolor)
- Tried deep sea cathedral palette, opaque pastels, uneven color splashes
- Soft pastel gradient (#c9a0dc, #88aaff, #88ffaa, #ffcc88, #ff88aa) was the intermediate state
- **Final decision**: Deep Stained Glass jewel tones (#1e50a8 cobalt, #a82040 ruby, #1a8a5a emerald, #c8a430 gold, #6a3090 amethyst) on near-pure black (#020203) background
- Background darkened by "two coats" from #0a0a0c → #050507 → #020203 for maximum typography contrast
- Black void splashes added for depth — like dark cathedral corners where light barely reaches

## Copy Management System (copy.ts)
- **File**: `apps/web/src/copy.ts` — **ALL website text is centralized here.**
- **How it works**: Every component imports `siteCopy` from `@/copy` and reads text from it instead of hardcoding strings.
- **How to edit**: Open `copy.ts`, find the section you want to change (clearly labeled with comments), and edit the text inside the quotes. Save and the site updates.
- **Structure**: `siteCopy` object has properties for each section: `header`, `hero`, `services`, `portfolio`, `about`, `contact`, `newsletter`, `footer`, `cookies`.
- **Removed from copy.ts**: `journal` block, `signal` block, hero `ctaButton`, hero `caption`, hero `scrollText`, portfolio `label`, portfolio `heading`, portfolio `sublabel`.
- **Adding projects**: Edit `siteCopy.portfolio.projects` array — copy an existing project block and change the values.
- **Line breaks**: Use `\n` inside strings for line breaks (e.g., `"Line one.\nLine two."`).
- **Do NOT edit text in `studio.tsx` or `root.tsx`** — all text should come from `copy.ts`.

## Important Notes for Future Sessions
- User has **Hostinger Premium plan** — does NOT want to spend extra money on services
- **✅ DEPLOYMENT FIXED**: GitHub Actions now uses FTP protocol with `SamKirkland/FTP-Deploy-Action@v4.3.5`. The `cleanup: true` setting automatically removes old build files.
- **Hostinger SFTP**: SFTP-only access (no shell — `/sbin/nologin`). This blocks SCP, SSH commands, and automated SFTP actions. **FTP on port 21 works** — it's a simpler protocol that doesn't require shell access.
- **Actions that FAILED (5 total, all SFTP/SCP-based)**:
  1. `wepanda改造/scp-sftp-action@v1.3.0` — File encoding corruption.
  2. `wlixcc/SFTP-Deploy-Action@v1.2.6` — Unzip/extract error (requires shell).
  3. `wangyucode/sftp-upload-action@v3` — Failed SFTP session.
  4. `appleboy/scp-action@v0.1.7` — SCP blocked by `/sbin/nologin`.
  5. `SamKirkland/FTP-Deploy-Action@v4.4.0` with `protocol: sftp` — v4 dropped SFTP support.
- **Solution**: FTP protocol (port 21) works because it only needs authentication and file transfer — no shell commands, no extraction, no SCP handshake.
- **Hostinger credentials**: IP `157.173.209.67`, SFTP port `65002`, FTP port `21`, user `u370713035`, password `A@Cu%kb8!Qcg^@7MymCY`
- **Repository is now public**: https://github.com/mosaicosound/mosaico-sound-website (can check Actions logs directly)
- **Domain**: `mosaicosound.com` (transferring, pending)
- **Current aesthetic direction**: Cathedral stained glass mosaic + hand-drawn sketch. Deep jewel tones on near-black background, Shadows Into Light font, wavy SVG pen-stroke dividers.
- **Typography**: Shadows Into Light unified everywhere. User wanted scribbly feel — tried Amatic SC (too extreme), settled on Shadows Into Light for subtle sketchiness.
- **Hero section**: Clean, compact, no animations. Pearl shimmer gradient on full headline. No typewriter, no cursor, no DAW canvas, no glitch effects.
- **Glow levels**: User prefers darker, more matte look with patches of pitch black. Background is #020203 (near-pure black) with black void splashes for depth.
- **Mobile menu**: Cinema-style full-screen reveal with hand-drawn wavy underlines. Must be outside `<header>` to avoid CSS stacking context clipping.
- **User prefers minimal, concise UI** — removes labels, captions, and decorative elements that don't add value. Wants eye to go directly to the work.
- **Project cleanup**: All template bloat removed. Only 5 npm packages. No shadcn, no Radix UI, no Framer Motion, no Three.js. Pure CSS animations.
- **Copy editing**: `COPY EDITING GUIDE.md` created in project root for easy text management. All text lives in `apps/web/src/copy.ts`.
- Website copy documents are saved at:
  - `Website Copy - Simple.txt`
  - `Website Copy - Edit This.html`

## Quick Commands Reference
```powershell
# Build the project
cd "C:\dev\Mosaico\horizons-export\apps\web"
npm run build

# Commit and push changes
cd "C:\dev\Mosaico\horizons-export"
git add .
git commit -m "Your changes description"
git push
```

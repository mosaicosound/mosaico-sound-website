# MOSAICO SOUND Website — Project Context

## Project Overview
- **Project Name**: MOSAICO SOUND (independent sound practice for advertising, film, and games)
- **Project Root**: `C:\dev\Mosaico\Source Material\Website AI Code\horizons-export`
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

### ⚠️ URGENT — Deployment is BROKEN (as of 2026-11-19)
The site has NOT been successfully deployed with the latest changes. The GitHub Actions workflow fails at the upload step.

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

### Deployment Workflow (⚠️ BROKEN — Needs Fix)
- **Workflow file**: `.github/workflows/deploy.yml`
- **Current state**: **Broken** — workflow triggers on push to `master`, build succeeds, but upload step fails.
- **Root cause**: The Hostinger SSH account has `/sbin/nologin` (SFTP-only, no shell). The current deploy.yml has encoding corruption (Chinese characters in action name `wepanda改造/scp-sftp-action` are mangled in the file).
- **What works**: Checkout, Node.js setup, `npm ci`, `npm run build` — all succeed in GitHub Actions.
- **What fails**: Any action requiring shell access on the remote server.

### 🔧 ACTION REQUIRED — Fix deploy.yml
1. **Rewrite `.github/workflows/deploy.yml` from scratch** (current file has encoding corruption).
2. Use a **pure SFTP action** that supports `sftp_only: true` (no shell needed). Recommended:
   ```yaml
   - name: Upload build to Hostinger via SFTP
     uses: wlixcc/SFTP-Deploy-Action@v1.2.6
     with:
       username: u370713035
       server: 157.173.209.67
       port: 65002
       password: A@Cu%kb8!Qcg^@7MymCY
       local_path: dist/apps/web/client/
       remote_path: /public_html
       sftp_only: true
   ```
3. Push to `master` to trigger a test deployment.
4. Verify the site at `https://sharp-paleturquoise-bat-64.hostingersite.com` shows the new content (typewriter animation, removed sections).
5. Once working, move credentials to GitHub repository secrets for security.

### Git Setup Status
- **Git Installed**: Yes
- **GitHub Repository**: ✅ `https://github.com/mosaicosound/mosaico-sound-website`
- **GitHub Actions**: ⚠️ Workflow exists but fails at upload — needs SFTP-only action
- **Domain**: `mosaicosound.com` (transferring, pending)

### Why This Deployment Method
- **Root Cause of Old Issues**: Hostinger's File Manager does NOT automatically delete old files when uploading new builds. Hashed assets from previous builds accumulate.
- **SFTP Solution**: Upload fresh build files via SFTP. Old unreferenced assets will remain on disk but won't be loaded by the browser since `index.html` references only the new hashed assets.
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

## Design Decisions & Current State (as of 2026-11-19)

### Overall Aesthetic: Scratch-Off Lottery Ticket + Chinese Ink Brush
- **Core concept**: The website combines two visual languages:
  1. **Scratch-off lottery ticket**: Letters coming to life as if revealed by scratching with a metal coin, with ink textures, scratch marks, and messy imperfections.
  2. **Chinese ink brush strokes**: All dividers and button underlines use flowing multicolor ink gradients with organic irregular edges, like a brush stroke in calligraphy.
- **Ink color**: `#0a0a0c` (deep black) with `--ink-light: #141418` as secondary dark tone.
- **Paper color**: `#e8e6e1` (aged paper).
- **Pure CSS implementation**: All effects use layered gradients, pseudo-elements, and text shadows — no JavaScript or external libraries for styling, well within Hostinger Premium limits.

### Background Texture (body::before)
- A fixed overlay covers the entire viewport with:
  - **SVG noise texture**: `feTurbulence` filter (baseFrequency 0.85, 4 octaves) for authentic newspaper grain at 12% opacity.
  - **Rust stains**: 6 organic radial gradient patches (brown/amber tones, 14-22% opacity).
  - **Paper fiber lines**: Very subtle repeating gradients (0.008 opacity horizontal, 0.005 opacity vertical).
  - **Ink splatter dots**: 7 tiny radial gradients (4-6% opacity) scattered across the surface.
- Content elements (`.site-header`, `.hero`, `.section`, `.newsletter`, `footer`) sit above via `position: relative; z-index: 1;`

### Typography — Unified Cormorant Garamond (Pearl Serif)
- **Font choice**: **Cormorant Garamond** (Google Fonts, free) — elegant pearl serif, light italic.
- **Applied to**: EVERYTHING on the site — body text, h1, h2, h3, `.brand`, navigation, buttons, section labels, `.mono` text, service numbers, portfolio categories, journal details, contact info, form labels and inputs, newsletter, footer, cookies dialog, empty state.
- **CSS variable**: `--font-pearl: 'Cormorant Garamond', Georgia, serif`
- **Font loaded via**: `root.tsx` Google Fonts link in `<head>` (not via @import in CSS, which doesn't work with Vite).
- **Key styling**:
  - `h1`: `clamp(68px, 10vw, 155px)`, weight 300, italic, letter-spacing 0.02em, max-width 900px.
  - `h2`: `clamp(40px, 5vw, 72px)`, weight 300, italic, letter-spacing 0.02em.
  - `h3`: 32px, weight 300, italic, letter-spacing 0.02em.
  - `.brand`: 30px, weight 300.
  - Body paragraphs: weight 300, line-height 1.8-1.9.
  - Labels/captions: 11-13px, weight 300-400, no uppercase transform.
- **Design evolution**: Started with Architects Daughter (handwritten) → user wanted elegance → Cormorant Garamond Light Italic for hero → then unified everything to Cormorant Garamond for consistency. Architects Daughter was tried but ultimately replaced.

### Hero Section — "Sonic Artistry Across Mediums"
- **Headline**: `Sonic Artistry<br/><em>Across Mediums</em>`
- **"Sonic Artistry"** (plain text): Pearl shimmer effect — slow gradient animation with soft iridescent colors.
- **"Across Mediums"** (`<em>` tag): **Typewriter animation** — 12s cycle:
  - Text reveals letter by letter via `width` animation (0→14ch) with `ease-out` timing
  - Blinking cursor (`::after` pseudo-element) follows the text reveal
  - Multicolor gradient letters are revealed as the cursor types
  - Text is `opacity: 0` before reveal and during reset phase (no pre-show of untyped letters)
  - Timing uses explicit keyframes matching the cubic ease-out curve (`1 - (1-raw)^3`)
- **"mosaico sound"** in header/footer: Simple static `var(--accent-gradient)` — **untouched by typewriter animation**.
- **Removed elements**: No "Explore the work" button, no caption line, no "SCROLL TO DISCOVER" link, no decorative divider.

### Typewriter + DAW Playhead Sync
- The DAW canvas playhead moves left-to-right in sync with the typewriter cursor
- Same 12s cycle with matching `ease-out` cubic curve (`1 - (1-raw)^3`)
- Playhead holds at end (~95%), then resets (~98-100%)
- No sinusoidal motion — linear left-to-right progress matching the typing rhythm

### DAW Session Sketch (SonicScene Component)
- **Location**: `apps/web/src/components/home/studio.tsx` — `SonicScene` component.
- **Visual**: 3 thin waveform tracks drawn on a 2D canvas, each with a unique pastel color (purple, blue, green).
- **Playhead**: Thin vertical line that sweeps left-to-right synced with the 12s typewriter cycle.
  - Follows cubic ease-out curve (`1 - (1-raw)^3`) — matches CSS typewriter timing exactly.
  - Very subtle glow (40px width, 4% max opacity).
  - Playhead line: 0.5px, 25% max opacity.
  - Progress received as parameter, not calculated from sine wave.
- **Positioning**: Centered behind the hero text at 45% width, 140px height, 35% opacity.
- **Mobile**: 70% width, 100px height, 25% opacity.
- **CSS class**: `.sonic-scene` — absolute positioned, pointer-events none, z-index 0.
- **Design rationale**: User wanted a small, subtle DAW session sketch to signal "recording" without overwhelming the hero. The playhead now moves at the rhythm of the typewriter cursor, not a sine wave.

### Multicolor Splashes (Hero Background Only)
- **Hero background** (`.hero::before`): 7 radial gradient splashes (purple, blue, green, amber, pink, violet, teal) at 12-25% opacity.
- **Splash pulse animation**: 6s cycle — opacity 0.08 to 0.25, saturate 0.1 to 0.7.
- **Section transitions**: Removed — no `.section::before` splash accents.
- **Shimmer lines**: Removed — all 5 `.shimmer-line` divider elements deleted from components.
- **Reduced glows**: User prefers darker, more matte look — splash base opacity at 0.08, max pulse at 0.25.

### Chinese Ink Brush Stroke Dividers
- **All dividers** use the same flowing multicolor ink gradient with organic irregular edges:
  - Header bottom (`.site-header::after`)
  - Section bottom (`.section::after`)
  - Form inputs (`.input::after`, `.select::after`, `.textarea::after`)
  - Newsletter bottom (`.newsletter::after`)
  - Footer top (`footer::before`)
  - Audio project dividers (`.audio-project::before`)
- **Removed dividers**: Hero caption (`.hero-caption::before` — section removed), Signal button (`.signal-button::after` — component removed).
- **Technique**: `linear-gradient(90deg)` with 7 color stops (purple → blue → green → amber → pink → purple → transparent), `border-radius: 50% 40% 60% 30% / 40% 50% 30% 60%`, `filter: blur(0.5px)`.
- **Focus state**: Inputs increase opacity on focus (0.3 → 0.6).

### Button Design — Clean with Chinese Ink Underline
- **Buttons** (`.nav-contact`, `.chips button`): Transparent background, no borders.
- **Hover effect**: Multicolor gradient text + Chinese ink brush underline (`::after`).
- **Underline**: 3px height, positioned 4px below text, fades in over 0.4s.
- **Removed**: `.primary` button class — "Explore the work" CTA button removed from hero.
- **Design evolution**: Started with sketchy borders → coffee-stain splashes → Chinese ink blob → thin underline. User wanted the thin underline beneath the text.

### Gradient Styling
- **`--accent-gradient`**: `linear-gradient(90deg, #c9a0dc, #88aaff, #88ffaa, #ffcc88, #ff88aa)`
- **`--accent-gradient-animate`**: Same + `#c9a0dc` at end for seamless loop.
- **`--accent-color`**: `#c9a0dc` (soft periwinkle).
- **Applies to**: Hero text, header/footer branding, section labels, link hovers, nav contact button, chip buttons, contact mono text, empty state SVG, form focus states, service hover reveal.

### Scratch Marks & Ink Effects
- **h1::after, h2::after**: Scratch lines and ink splatter dots around headings via pseudo-elements.
- **Service dividers**: Rough scratched lines with gradient hover reveal (`.service::before`, `.service::after`).
- **Contact section**: SVG noise texture overlay + rust stain (`.contact::before`).
- **Journal accordion**: Scratched vertical line beside text (`details.service p::before`).
- **Contact items**: Scratched dividers above each item (`.contact-item::before`).
- **Empty state**: Rough scratched border (`.empty::before`).
- **Cookies dialog**: Rough scratched border (`.cookies::before`).

### "feel" Word Animations (REMOVED)
- **Status**: Completely removed during project cleanup (2026-11-19).
- **What was removed**: The 4-effect sequencer (Shiver, Explode, Font Change, Typewriter), the `useFeelSequencer` hook, `FEEL_EFFECTS` config array, and all related CSS keyframes (~150 lines).
- **Replaced by**: The "Across Mediums" typewriter animation on `h1 em` — a different concept that types out the emphasis text with synced DAW playhead.

### Page Layout Order (home.tsx)
- **Current order**: Hero → Portfolio → Services → About → Contact → Newsletter
- **Removed sections**: 
  - **Journal/Studio Notes** — completely removed (component, copy, navigation link, route import)
  - **Signal Demo** — audio tone button removed (component, copy, CSS)
- **Portfolio**: Appears immediately after Hero. No "02 / LISTEN CLOSELY" label, no "Made to be heard." heading, no "HEADPHONES RECOMMENDED" sublabel.
- **Section spacing**: `padding: 60px 5%` (reduced from `105px 5%`) — sections sit closer together.
- **No decorative dividers**: Shimmer lines between sections removed.

### Color Palette Evolution
- Started with vibrant rainbow (ruby, amber, teal, cobalt, purple, magenta)
- Explored stained glass mosaic effects (12-shard cathedral, 36-shard watercolor)
- Tried deep sea cathedral palette, opaque pastels, uneven color splashes
- **Final decision**: Soft pastel gradient (#c9a0dc, #88aaff, #88ffaa, #ffcc88, #ff88aa) applied consistently everywhere

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
- **🔴 TOP PRIORITY**: Fix the broken GitHub Actions deployment (see "ACTION REQUIRED" section above). The site has NOT been deployed with the latest changes.
- **Hostinger SFTP**: SFTP-only access (no shell). Use `wlixcc/SFTP-Deploy-Action@v1.2.6` with `sftp_only: true`.
- **Hostinger credentials**: IP `157.173.209.67`, port `65002`, user `u370713035`, password `A@Cu%kb8!Qcg^@7MymCY`
- **Domain**: `mosaicosound.com` (transferring, pending)
- **Current aesthetic direction**: Scratch-off lottery ticket + Chinese ink brush strokes + pearl shimmer typography. User wants elegance with crafty imperfection.
- **Typography**: Cormorant Garamond unified everywhere. User rejected Architects Daughter (too casual) in favor of elegant serif.
- **Typewriter animation**: 12s cycle on "Across Mediums" — text reveals letter by letter with synced DAW playhead. This replaced the ripple-lake animation.
- **Glow levels**: User prefers darker, more matte look with patches of pitch black. All glows are reduced (splashes at 0.08-0.25 opacity, minimal text shadows).
- **DAW sketch**: Small, subtle, centered behind text — playhead synced to typewriter rhythm (ease-out, not sine wave).
- **User prefers minimal, concise UI** — removes labels, captions, and decorative elements that don't add value. Wants eye to go directly to the work.
- **Project cleanup**: All template bloat removed. Only 5 npm packages. No shadcn, no Radix UI, no Framer Motion, no Three.js. Pure CSS animations.
- Website copy documents are saved at:
  - `Website Copy - Simple.txt`
  - `Website Copy - Edit This.html`

## Quick Commands Reference
```powershell
# Build the project
cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export\apps\web"
npm run build

# Commit and push changes
cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export"
git add .
git commit -m "Your changes description"
git push
```

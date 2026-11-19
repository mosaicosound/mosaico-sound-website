# MOSAICO SOUND Website — Project Context

## Project Overview
- **Project Name**: MOSAICO SOUND (independent sound practice for advertising, film, and games)
- **Project Root**: `C:\dev\Mosaico\Source Material\Website AI Code\horizons-export`
- **Web App Directory**: `apps/web/`
- **Live URL**: `https://sharp-paleturquoise-bat-64.hostingersite.com` (Hostinger demo/staging domain)
- **Package Name**: `mosaico-sound-web` (updated from `sonic-artisan-web`)

## Tech Stack
- **Framework**: React Router v8 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Build Output**: `dist/apps/web/` (configured in `react-router.config.ts`)
- **SSR**: Disabled (static site)
- **Key Dependencies**: React 19, Framer Motion, Three.js, Lucide React icons, Sonner (toasts)

## Hostinger Deployment Setup

### Hosting Plan
- **Plan**: Hostinger Premium (shared hosting)
- **Git Integration**: Available at no extra cost on Premium plan
- **Important Limitation**: Shared hosting does NOT run build commands like `npm run build` automatically on the server

### Deployment Workflow (Fully Automated, Free)
1. **Make changes** to your source code locally
2. **Commit and push** to GitHub:
   ```powershell
   cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export"
   git add .
   git commit -m "Your changes description"
   git push
   ```
3. **GitHub Actions** automatically builds the project and pushes the compiled files to the `build` branch
4. **Hostinger** auto-deploys from the `build` branch — replaces all files in `public_html`, so no old assets accumulate

**No manual build step needed!** Just push source code to `master` and the rest is automatic.

### Why Git Deployment (Not Manual Upload)
- **Root Cause of Old Issues**: Hostinger's File Manager does NOT automatically delete old files when uploading new builds. It only updates existing files and adds new ones, so hashed assets from previous builds accumulate.
- **Git Integration Solution**: Each deployment via Git **replaces all files** in `public_html` with the latest version from the repository, preventing old asset accumulation.
- **No Manual File Uploads**: Never use File Manager for deployments again.

### Git Setup Status
- **Git Installed**: Yes (version 2.56.0.4)
- **Repository Initialized**: Yes
- **GitHub Repository**: ✅ Created at `https://github.com/mosaicosound/mosaico-sound-website`
- **GitHub Actions**: ✅ Working — automatically builds on every push to `master`, pushes built files to `build` branch
- **Build Branch**: ✅ `origin/build` contains compiled static files (index.html, assets/, favicon.png, robots.txt, sitemap.xml)
- **Hostinger-Git Connection**: ⏳ PENDING — user needs to connect via hPanel → Advanced → Git → select `build` branch
- **GitHub Token**: Stored in Git config for authentication (classic PAT with `repo` scope)

### Deployment Guide
- A comprehensive `DEPLOYMENT.md` file has been created in the project root with step-by-step instructions for:
  - Creating a GitHub repository
  - Connecting local repo to GitHub
  - Connecting Hostinger to GitHub for automatic deployments
  - Making updates with simple git commands
  - Troubleshooting common issues

### GitHub Actions Automation (✅ SET UP & WORKING)
- **Workflow file**: `.github/workflows/build-and-deploy.yml`
- **How it works**: Push source code to `master` → GitHub Actions builds → Built files pushed to `build` branch → Hostinger deploys from `build` branch
- **Status**: ✅ Tested and working — Run #2 completed successfully
- **Free**: Uses GitHub Actions free tier (2,000 build minutes/month for private repos)

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
│   ├── web/                    # Main website application
│   │   ├── src/               # Source code
│   │   ├── package.json       # Dependencies and scripts
│   │   ├── vite.config.ts     # Build configuration
│   │   └── react-router.config.ts  # React Router config (SSR: false)
│   └── pocketbase/            # Backend (not deployed to Hostinger)
├── dist/                      # Build output (generated, in .gitignore)
├── node_modules/              # Dependencies (generated, in .gitignore)
├── .gitignore                 # Files to exclude from Git
├── DEPLOYMENT.md              # Deployment guide
└── .junie/                    # Junie AI session context (this folder)
```

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
- **Headline**: `Sonic Artistry<br/><em>Across</em> <em>Mediums</em>`
- **"Sonic Artistry"** (plain text): Pearl shimmer effect — slow 8s gradient animation with soft iridescent colors (white, cool blue, warm pink) and subtle text-shadow glow.
- **"Across Mediums"** (`<em>` tags): **Ripple-lake animation** — 6s cycle:
  - 0-15%: Pearl calm (desaturated, soft white/gray)
  - 15-25%: Rock touches water (color begins to bloom)
  - 25-50%: Multicolor ripple expands (full vibrant pastel colors)
  - 50-75%: Ripple fades (colors drain away)
  - 75-100%: Pearl calm returns
  - Uses `filter: saturate()` from 0.05 to 1.0 + `brightness()` from 1 to 1.15.
- **"mosaico sound"** in header/footer: Simple static `var(--accent-gradient)` — **untouched by ripple animation**.
- **`em` CSS**: `var(--accent-gradient)` with text clipping, `padding: 0 4px`, `overflow: visible`.
- **`h1 em` CSS**: `var(--accent-gradient-animate)` with `@keyframes ripple-lake` (6s cycle).

### DAW Session Sketch (SonicScene Component)
- **Location**: `apps/web/src/components/home/studio.tsx` — `SonicScene` component.
- **Visual**: 3 thin waveform tracks drawn on a 2D canvas, each with a unique pastel color (purple, blue, green).
- **Playhead**: Thin vertical line that sweeps left-to-right synced with the 6s ripple cycle.
  - Follows `Math.sin(cycleT * Math.PI)` curve — slow, light-like movement.
  - Very subtle glow (40px width, 4% max opacity).
  - Playhead line: 0.5px, 25% max opacity.
- **Positioning**: Centered behind the hero text at 45% width, 140px height, 35% opacity.
- **Mobile**: 70% width, 100px height, 25% opacity.
- **CSS class**: `.sonic-scene` — absolute positioned, pointer-events none, z-index 0.
- **Design rationale**: User wanted a small, subtle DAW session sketch to signal "recording" without overwhelming the hero. Started as full-background, reduced to 5 tracks, then 3 tracks, finally positioned as a small centered window behind the text.

### Multicolor Splashes (Hero + Section Transitions)
- **Hero background** (`.hero::before`): 7 radial gradient splashes (purple, blue, green, amber, pink, violet, teal) at 12-25% opacity.
- **Splash pulse animation**: 6s cycle synced with ripple — opacity 0.08 to 0.25, saturate 0.1 to 0.7.
- **Section transitions** (`.section::before`): 3 faint splash accents (purple, blue, amber) at 8-12% opacity, same 6s pulse.
- **Reduced glows**: User requested less glow overall — splash base opacity reduced from 0.6 to 0.2, max pulse from 0.7 to 0.25.

### Chinese Ink Brush Stroke Dividers
- **All dividers** use the same flowing multicolor ink gradient with organic irregular edges:
  - Header bottom (`.site-header::after`)
  - Hero caption top (`.hero-caption::before`)
  - Signal button bottom (`.signal-button::after`)
  - Section bottom (`.section::after`)
  - Form inputs (`.input::after`, `.select::after`, `.textarea::after`)
  - Newsletter bottom (`.newsletter::after`)
  - Footer top (`footer::before`)
  - Audio project dividers (`.audio-project::before`)
- **Technique**: `linear-gradient(90deg)` with 7 color stops (purple → blue → green → amber → pink → purple → transparent), `border-radius: 50% 40% 60% 30% / 40% 50% 30% 60%`, `filter: blur(0.5px)`.
- **Focus state**: Inputs increase opacity on focus (0.3 → 0.6).

### Button Design — Clean with Chinese Ink Underline
- **All buttons** (`.nav-contact`, `.primary`, `.chips button`): Transparent background, no borders.
- **Hover effect**: Multicolor gradient text + Chinese ink brush underline (`::after`).
- **Underline**: 3px height, positioned 4px below text, fades in over 0.4s.
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

### "feel" Word Animations (PAUSED)
- **4 effects implemented**: Shiver, Explode, Font Change, Typewriter
- **CSS location**: `apps/web/src/index.css` — lines 425-574
- **JavaScript sequencer**: `apps/web/src/components/home/studio.tsx` — `useFeelSequencer` hook with `FEEL_EFFECTS` config array
- **Current state**: **PAUSED** — `useFeelSequencer(feelRef)` is commented out in the `Hero` component with a TODO note
- **To re-enable**: Uncomment the line `// useFeelSequencer(feelRef);` in the `Hero` component
- **Effects configuration**:
  - Shiver: 2000ms, letters tremble with small translate/rotate movements
  - Explode: 2200ms, letters scatter outward with scale and opacity
  - Font: 2000ms, switches through different font styles
  - Typewriter: 2000ms, letters reveal one by one using clip-path
- **Mobile adjustments**: Separate keyframes for shiver and explode on screens < 760px
- **Reduced motion**: All animations disabled via `@media (prefers-reduced-motion: reduce)`

### Page Layout Order (home.tsx)
- **Current order**: Hero → Portfolio → Services → About → Journal → Contact → Newsletter
- **Portfolio moved**: User requested "02 / Listen closely" (Portfolio) to appear immediately after the Hero section.

### Color Palette Evolution
- Started with vibrant rainbow (ruby, amber, teal, cobalt, purple, magenta)
- Explored stained glass mosaic effects (12-shard cathedral, 36-shard watercolor)
- Tried deep sea cathedral palette, opaque pastels, uneven color splashes
- **Final decision**: Soft pastel gradient (#c9a0dc, #88aaff, #88ffaa, #ffcc88, #ff88aa) applied consistently everywhere

### Header Animated Shimmer Lines
- Two animated gradient lines sweep across the header bottom and section dividers.
- Uses the same pastel color palette, 14s and 18s animation durations.
- Base scratch mark layer + animated color overlay.

## Copy Management System (copy.ts)
- **File**: `apps/web/src/copy.ts` — **ALL website text is centralized here.**
- **How it works**: Every component imports `siteCopy` from `@/copy` and reads text from it instead of hardcoding strings.
- **How to edit**: Open `copy.ts`, find the section you want to change (clearly labeled with comments), and edit the text inside the quotes. Save and the site updates.
- **Structure**: `siteCopy` object has properties for each section: `header`, `hero`, `services`, `portfolio`, `about`, `journal`, `contact`, `newsletter`, `footer`, `cookies`, `signal`.
- **Adding projects**: Edit `siteCopy.portfolio.projects` array — copy an existing project block and change the values.
- **Adding journal articles**: Edit `siteCopy.journal.articles` array — copy an existing article block and change the values.
- **Line breaks**: Use `\n` inside strings for line breaks (e.g., `"Line one.\nLine two."`).
- **Do NOT edit text in `studio.tsx` or `root.tsx`** — all text should come from `copy.ts`.

## Important Notes for Future Sessions
- User has **Hostinger Premium plan** — does NOT want to spend extra money on services
- **GitHub + GitHub Actions are fully set up and working** — push to `master`, `build` branch auto-updates, Hostinger auto-deploys
- **Hostinger-Git connection**: ✅ Confirmed working as of 2026-11-19
- User may want to **experiment with the "feel" animations** — paused for now, ready to re-enable
- **Current aesthetic direction**: Scratch-off lottery ticket + Chinese ink brush strokes + pearl shimmer typography. User wants elegance with crafty imperfection.
- **Typography**: Cormorant Garamond unified everywhere. User rejected Architects Daughter (too casual) in favor of elegant serif.
- **Ripple animation**: 6s cycle is the heartbeat of the hero — text, DAW playhead, and splashes all sync to this rhythm.
- **Glow levels**: User prefers darker, more matte look with patches of pitch black. All glows are reduced (splashes at 0.08-0.25 opacity, minimal text shadows).
- **DAW sketch**: Small, subtle, centered behind text — signals "recording" without dominating.
- Website copy documents are saved at:
  - `Website Copy - Simple.txt`
  - `Website Copy - Edit This.html`
- Mosaico Folder reorganization logs are saved at: `Source Material\Logs for AI\results2.txt`

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

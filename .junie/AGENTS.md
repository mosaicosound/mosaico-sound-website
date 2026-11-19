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

### Overall Aesthetic: Lottery Ticket Scratch-Off Effect
- **Core concept**: User wants the website to feel like a scratched lottery ticket — letters coming to life as if revealed by scratching with a metal coin, with ink textures, scratch marks, and messy imperfections throughout.
- **Ink color**: Darkened to `#0a0a0c` (deeper black) for richer contrast, with `--ink-light: #141418` as a secondary dark tone.
- **Paper color**: Warmed to `#e8e6e1` for an aged paper feel.
- **Pure CSS implementation**: All scratch effects use layered gradients, pseudo-elements (`::before`, `::after`), and text shadows — no JavaScript or external libraries needed, well within Hostinger Premium limits.

### Background Texture (body::before)
- A fixed overlay covers the entire viewport with:
  - Fine horizontal scratch marks (repeating gradient every 2-3px)
  - Fine vertical scratch marks (repeating gradient every 3-4px)
  - Random diagonal scratch lines at various angles (45°, -30°, 70°, -60°, 15°)
  - Ink noise texture (radial gradients at different positions)
- Content elements (`.site-header`, `.hero`, `.section`, `.newsletter`, `footer`) sit above this texture via `position: relative; z-index: 1;`

### Typography (Fully Consistent Handwritten Style)
- **Font choice**: Architects Daughter (Google Fonts, free) — technical sketch-pen style, like notes written with a fine-tip pen on a Remarkable tablet
- **Applied to**: EVERYTHING on the site — body text, h1, h2, h3, .brand, navigation, buttons, section labels, .mono text, service numbers, portfolio categories, journal details, contact info, form labels and inputs, newsletter, footer, cookies dialog, empty state
- **Inter font**: Still loaded as fallback in CSS variables but no longer used as the primary font
- **CSS variables**: `--font-handwritten: 'Architects Daughter', cursive` and `--font-sans: 'Inter', Arial, Helvetica, sans-serif`
- **Font loaded via**: `root.tsx` Google Fonts link in the `<head>` (not via @import in CSS, which doesn't work with Vite)
- **Design rationale**: User wanted "elegance + handwritten in a sketch pen line type of way... like the remarkable paper tablet feels like." Architects Daughter was chosen over Caveat (too casual), Kalam (too calligraphic), and Dancing Script (too formal) for its technical yet hand-drawn quality.
- **Text styling**: Removed uppercase text-transform and tight letter-spacing from labels and captions — they clash with handwritten style. Font sizes adjusted slightly larger to compensate for the handwritten feel.
- **Body paragraphs**: Also use Architects Daughter (not Inter) for complete consistency — the entire site feels like one notebook

### Ink Bleed & Scratch Marks on Headings
- **h1 text-shadow**: `0 0 1px rgba(232,230,225,0.3), 1px 1px 2px rgba(0,0,0,0.5), -1px -1px 1px rgba(255,255,255,0.05)` — letters look freshly scratched
- **h2 text-shadow**: `0 0 1px rgba(232,230,225,0.25), 1px 1px 2px rgba(0,0,0,0.4)` — ink bleed on section headings
- **em text-shadow**: `0 0 2px rgba(232,230,225,0.2), 2px 1px 3px rgba(0,0,0,0.4)` — ink scratch effect on colored text
- **h1::after, h2::after**: Scratch marks and ink splatter dots around headings via pseudo-elements with radial gradients simulating coin scratches

### Rough Hand-Drawn Borders (replacing all clean borders)
- **All clean borders replaced** with rough scratch-line borders using `::before` pseudo-elements
- **Elements with scratch borders**: `.site-header`, `.nav-contact`, `.primary` button, `.chips button`, `.service` dividers, `.hero-caption`, `.signal-button`, `.section` dividers, `.empty` state, form inputs, footer, newsletter, audio projects, cookies dialog
- **Border technique**: Layered gradients simulating imperfect hand-drawn lines with slightly uneven corners (`border-radius: 2px 1px 3px 2px`)
- **Hover states**: Scratch borders fade to lower opacity on hover, revealing gradient text underneath

### Ink Splatter Details
- **`.primary::after`**: Tiny ink splatter dot near the primary button
- **Heading scratch marks**: Random scratch lines above and below h1/h2, plus ink splatter dots at various positions

### Hero Section
- **Headline**: "Sonic Artistry<br/><em>Across</em> <em>Mediums</em>" (changed from "Sound that makes you feel")
- **Both "Across" and "Mediums"** use `<em>` tags for the multicolor gradient effect
- **"mosaico sound"** in header (`root.tsx`) and footer (`studio.tsx`) uses `<em>` tags for the same gradient effect
- **`em` CSS**: Simple `var(--accent-gradient)` with text clipping, `padding: 0 4px`, `overflow: visible` to prevent cut-off letters

### Gradient Styling
- **Current gradient**: Soft pastel colors — `linear-gradient(90deg, #c9a0dc, #88aaff, #88ffaa, #ffcc88, #ff88aa)`
- **`--accent-color`**: `#c9a0dc` (soft periwinkle)
- **Consistency decision**: User requested all multicolor elements use the same simple gradient for visual consistency. The complex stained glass mosaic effect (36-shard watercolor) was reverted to the simple `var(--accent-gradient)` on the `em` selector.
- **Gradient applies to**: Hero text ("Across Mediums"), header/footer branding ("mosaico sound"), section labels (`.section-label`), link hovers (`a:hover`), nav contact button, chip buttons when active, contact mono text, empty state SVG, and form focus states.

### "feel" Word Animations (PAUSED)
- **4 effects implemented**: Shiver, Explode, Font Change, Typewriter
- **CSS location**: `apps/web/src/index.css` — lines 130-279
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

### Color Palette Evolution
- Started with vibrant rainbow (ruby, amber, teal, cobalt, purple, magenta)
- Explored stained glass mosaic effects (12-shard cathedral, 36-shard watercolor)
- Tried deep sea cathedral palette, opaque pastels, uneven color splashes
- **Final decision**: User prefers simple consistent gradient across all elements with soft pastel colors

### Header Animated Lines
- Multicolor shimmer lines on header bottom border and section dividers
- Uses the same pastel color palette as the gradient
- Shimmer lines now have a scratch mark base layer plus animated color overlay

## Important Notes for Future Sessions
- User has **Hostinger Premium plan** — does NOT want to spend extra money on services
- **GitHub + GitHub Actions are fully set up and working** — just push to `master` and the `build` branch is auto-updated
- **Hostinger-Git connection**: User confirmed deployment is complete and working as of 2026-11-19
- User may want to **experiment with the "feel" animations** — they are paused for now, ready to be re-enabled
- **Current aesthetic direction**: Lottery ticket scratch-off effect with ink textures, scratch marks, and messy imperfections. User wants more messiness and scratch effects — "see those letters come to life like the effect when you scratch a lottery ticket with a metal coin."
- **Typography direction**: Architects Daughter handwritten font applied to everything. User wants "elegance + handwritten in a sketch pen line type of way... like the remarkable paper tablet feels like."
- **Styling areas still to refine**: Services section, Portfolio section, About section, Contact section, Footer & Newsletter — user selected "Overall Typography" first, then moved to scratch-off effects. Other sections may need similar treatment.
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

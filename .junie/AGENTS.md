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

### Deployment Workflow (Free, No Extra Cost)
1. **Build locally** on your computer:
   ```powershell
   cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export\apps\web"
   npm run build
   ```
2. **Commit and push** the built files to GitHub:
   ```powershell
   cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export"
   git add .
   git commit -m "Update site"
   git push
   ```
3. **Hostinger auto-deploys** from GitHub — replaces all files in `public_html`, so no old assets accumulate

### Why Git Deployment (Not Manual Upload)
- **Root Cause of Old Issues**: Hostinger's File Manager does NOT automatically delete old files when uploading new builds. It only updates existing files and adds new ones, so hashed assets from previous builds accumulate.
- **Git Integration Solution**: Each deployment via Git **replaces all files** in `public_html` with the latest version from the repository, preventing old asset accumulation.
- **No Manual File Uploads**: Never use File Manager for deployments again.

### Git Setup Status
- **Git Installed**: Yes (version 2.56.0.4)
- **Repository Initialized**: Yes, with 214 files committed
- **GitHub Repository**: NOT YET CREATED — user needs to create a GitHub repo and connect it
- **Hostinger-Git Connection**: NOT YET CONFIGURED — user needs to connect via hPanel → Advanced → Git

### Deployment Guide
- A comprehensive `DEPLOYMENT.md` file has been created in the project root with step-by-step instructions for:
  - Creating a GitHub repository
  - Connecting local repo to GitHub
  - Connecting Hostinger to GitHub for automatic deployments
  - Making updates with simple git commands
  - Troubleshooting common issues

### Alternative: GitHub Actions Automation (Free)
- Can automate the build step so user doesn't have to run `npm run build` manually
- GitHub Actions is free for public repos and includes 2,000 build minutes/month for private repos
- Workflow: Push source code → GitHub Actions builds → Built files pushed to `build` branch → Hostinger deploys from `build` branch
- **Not yet set up** — offered to user as an option

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

## Important Notes for Future Sessions
- User has **Hostinger Premium plan** — does NOT want to spend extra money on services
- User selected **"Install Git + Auto Deploy"** solution for future deployments
- Git is installed and repo is initialized, but **GitHub repo creation and Hostinger connection are NOT YET DONE**
- User may want GitHub Actions automation set up in the future to automate the build step
- User wants to **experiment with the "feel" animations** — they are paused for now, ready to be re-enabled
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

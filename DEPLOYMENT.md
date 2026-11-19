# Deployment Guide for MOSAICO SOUND Website

## Overview

This guide explains how to deploy your MOSAICO SOUND website to Hostinger using Git integration. This method **automatically** handles deployments, eliminating the old asset accumulation problem you experienced with manual uploads.

## Why Use Git Deployment?

- **Automatic cleanup**: Hostinger replaces all files with each deployment, so old hashed assets don't accumulate
- **One-command updates**: Just push your changes to GitHub, and Hostinger automatically deploys them
- **Version control**: Track all changes to your website with full history
- **No manual file uploads**: Never use File Manager again for deployments

## Prerequisites

- [x] Git installed on your computer
- [x] Project initialized with Git (completed)
- [ ] GitHub account (free at github.com)
- [ ] Hostinger account with your website

## Step 1: Create a GitHub Repository

1. Go to https://github.com and sign in (or create a free account)
2. Click the **New** button or the **+** icon in the upper-right corner
3. Repository name: `mosaico-sound-website` (or your preferred name)
4. Visibility: **Private** (recommended) or Public
5. **Do not** initialize with README, .gitignore, or license
6. Click **Create repository**

## Step 2: Connect Local Repository to GitHub

Open PowerShell in your project folder and run these commands:

```powershell
# Navigate to your project
cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mosaico-sound-website.git

# Push your code to GitHub
git push -u origin master
```

**Note**: You'll be prompted to sign in to GitHub. You can:
- Use your GitHub password with a Personal Access Token (recommended)
- Or set up SSH keys for passwordless authentication

### Creating a GitHub Personal Access Token (if needed)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Give it a name like "Mosaico Website Deploy"
4. Select these scopes: **repo** (full control of private repositories)
5. Click **Generate token**
6. **Copy the token immediately** — you won't see it again
7. When PowerShell asks for your password, paste this token instead

## Step 3: Connect Hostinger to GitHub

1. Log in to your **Hostinger hPanel**
2. Go to **Websites** → click **Manage** next to your site
3. In the left sidebar, go to **Advanced** → **Git**
4. Click **Connect with GitHub**
5. Authorize Hostinger to access your GitHub account
6. Select the `mosaico-sound-website` repository
7. Configure deployment settings:
   - **Branch**: `master`
   - **Deploy directory**: `public_html` (default)
8. Click **Deploy** for the initial deployment

## Step 4: Making Updates

After setup, updating your website is simple:

```powershell
# Navigate to your project
cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export"

# Make your changes to files...

# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Describe your changes here"

# Push to GitHub (Hostinger will auto-deploy)
git push
```

Hostinger will automatically:
1. Detect the new commit
2. Pull the latest code
3. Replace all files in `public_html`
4. Your site is updated!

## Important Notes

### Build Before Deploying

Your project uses React Router with Vite. Before deploying, you **must** build the project:

```powershell
cd "C:\dev\Mosaico\Source Material\Website AI Code\horizons-export\apps\web"

# Install dependencies (if needed)
npm install

# Build the project
npm run build
```

The build output goes to `dist/apps/web/`. This is what gets deployed.

### What Gets Deployed

With Hostinger Git integration, the entire repository contents are deployed to `public_html`. However, the `.gitignore` file excludes:
- `node_modules/` (dependencies)
- `dist/` (build output)
- Other temporary files

**Important**: Since the build output (`dist/`) is excluded from Git, you have two options:

#### Option A: Build Locally, Deploy Build Output Only
1. Build the project locally
2. Create a separate repository with only the build output
3. Connect that repository to Hostinger

#### Option B: Use Hostinger's Build Feature (Recommended)
If your Hostinger plan supports Node.js apps:
1. Use the **Node.js** Git integration instead of the generic Git feature
2. Hostinger will automatically run `npm install` and `npm run build`
3. Set the build command and output directory in hPanel

#### Option C: Manual Build + Git Commit (Simplest for Now)
1. Build the project: `npm run build`
2. Temporarily add dist to Git: `git add dist/`
3. Commit and push: `git commit -m "New build" && git push`
4. Hostinger deploys the pre-built files

**For your current setup, Option C is recommended** until you're comfortable with the workflow.

## Troubleshooting

### Changes Not Showing Up

1. **Clear Hostinger cache**:
   - Go to hPanel → Websites → Manage → Performance → Cache
   - Click **Flush cache**

2. **Check deployment status**:
   - Go to hPanel → Advanced → Git → Deployments
   - Verify the latest deployment was successful

3. **Hard refresh your browser**:
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

### Deployment Failed

1. Check the deployment logs in hPanel → Advanced → Git → Deployments
2. Common issues:
   - Repository connection lost: Reconnect in Git settings
   - Permission issues: Verify GitHub app permissions
   - Build errors: Check that all dependencies are listed in package.json

## Git Commands Reference

```powershell
# Check status of your files
git status

# See what changes you've made
git diff

# View commit history
git log --oneline

# Undo unstaged changes
git checkout -- .

# Undo staged changes
git reset HEAD .

# Create a tag for a release
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

## Project Structure

```
horizons-export/
├── apps/
│   ├── web/                    # Main website application
│   │   ├── src/               # Source code
│   │   ├── package.json       # Dependencies and scripts
│   │   └── vite.config.ts     # Build configuration
│   └── pocketbase/            # Backend (not deployed to Hostinger)
├── dist/                      # Build output (generated)
├── node_modules/              # Dependencies (generated)
└── .gitignore                 # Files to exclude from Git
```

## Support

- **Hostinger Git documentation**: https://docs.hostinger.com/websites/git
- **GitHub documentation**: https://docs.github.com
- **Git documentation**: https://git-scm.com/doc

---

**Last updated**: 2026-11-19

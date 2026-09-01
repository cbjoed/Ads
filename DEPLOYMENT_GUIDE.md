# 🚀 GitHub Pages Deployment & DNS Setup Guide

Complete step-by-step instructions for deploying your Blazor WebAssembly app to GitHub Pages with a custom domain.

## Table of Contents

1. [GitHub Repository Setup](#github-repository-setup)
2. [DNS Configuration](#dns-configuration)
3. [GitHub Actions Workflow](#github-actions-workflow)
4. [Deployment Steps](#deployment-steps)
5. [Verification & Troubleshooting](#verification--troubleshooting)
6. [Custom Domain SSL/TLS](#custom-domain-ssltls)

---

## GitHub Repository Setup

### Step 1: Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `ads` (or your preferred name)
3. **Description**: "A Pomodoro study timer with task management built with Blazor WebAssembly"
4. **Visibility**: Public (required for free GitHub Pages)
5. **Initialize**: Add `.gitignore` for C#
6. Click **Create repository**

### Step 2: Clone & Setup Local Repository

```powershell
# Clone the repository
git clone https://github.com/yourusername/ads.git
cd ads\Ads

# Remove the Ads folder if it exists
cd ..
rm -r Ads -Force
cd Ads

# Your project files should already be here from previous setup
```

### Step 3: Configure Git (First Time Only)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Initial Commit

```powershell
cd c:\Users\cbjoe\Desktop\Portfolio\ads\Ads

# Stage all files
git add .

# Commit
git commit -m "Initial Blazor WebAssembly app with GitHub Pages deployment"

# Push to main branch
git push -u origin main
```

If you get an authentication error, use GitHub CLI:
```powershell
gh auth login
# Follow prompts, then retry: git push -u origin main
```

---

## DNS Configuration

### Prerequisites

- Domain registered (e.g., `cbjoed.com`)
- Access to domain registrar's DNS settings
- Domain registrar examples: GoDaddy, Namecheap, Route 53, Cloudflare, etc.

### Step 1: Understand DNS Records

For subdomain `ads.cbjoed.com`, use:

| Type  | Name | Value                          | TTL |
|-------|------|--------------------------------|-----|
| CNAME | ads  | yourusername.github.io         | 3600 |

**Explanation**:
- **CNAME** (Canonical Name) points your subdomain to GitHub's servers
- **yourusername.github.io** is GitHub Pages' default domain (replace with your username)

### Step 2: Configure DNS at Registrar

#### Example 1: GoDaddy

1. Log in to [GoDaddy.com](https://www.godaddy.com)
2. Go to **My Products** → **Manage** (Domains)
3. Select your domain (`cbjoed.com`)
4. Click **DNS** (or **Manage DNS**)
5. Under **Records**, click **Add**
6. Set:
   - **Type**: CNAME
   - **Name**: `ads`
   - **Value**: `yourusername.github.io`
   - **TTL**: 3600
7. Click **Save**

#### Example 2: Namecheap

1. Log in to [Namecheap.com](https://www.namecheap.com)
2. Go to **Dashboard** → **Domain List**
3. Click **Manage** next to `cbjoed.com`
4. Go to **Advanced DNS** tab
5. Click **Add New Record**
6. Set:
   - **Type**: CNAME Record
   - **Host**: `ads`
   - **Value**: `yourusername.github.io`
   - **TTL**: 3600
7. Click **Save**

#### Example 3: Cloudflare

1. Log in to [Cloudflare.com](https://www.cloudflare.com)
2. Select your domain
3. Go to **DNS**
4. Click **Add Record**
5. Set:
   - **Type**: CNAME
   - **Name**: `ads`
   - **Target**: `yourusername.github.io`
   - **Proxy**: DNS only (not proxied)
6. Click **Save**

### Step 3: Verify DNS Setup

Wait 5-10 minutes for DNS propagation, then test:

```powershell
# Option 1: PowerShell nslookup
nslookup ads.cbjoed.com

# Should return something like:
# Name:    ads.cbjoed.com
# Address: 185.199.108.153
# ...

# Option 2: Online DNS Checker
# Go to https://mxtoolbox.com/nslookup.aspx
# Enter: ads.cbjoed.com
```

---

## GitHub Actions Workflow

### Understanding the Workflow

The `.github/workflows/deploy.yml` file automates:

1. **Trigger**: Push to `main` branch
2. **Setup**: Install .NET 8 SDK
3. **Build**: Compile Blazor WASM project
4. **Publish**: Generate static files
5. **Deploy**: Push to `gh-pages` branch
6. **Serve**: GitHub Pages hosts static files

### Workflow File Location

```
AdsApp/
└── .github/workflows/deploy.yml
```

### Key Workflow Steps

```yaml
- name: Setup .NET
  uses: actions/setup-dotnet@v4
  with:
    dotnet-version: '8.0.x'

- name: Publish
  run: dotnet publish -c Release -o ./publish

- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
  with:
    path: './publish/wwwroot'
```

### Customizing Workflow

To modify build parameters, edit `.github/workflows/deploy.yml`:

```yaml
- name: Publish
  run: |
    dotnet publish -c Release -o ./publish \
    -p:PublishTrimmed=true \
    -p:EnableTrimAnalyzer=false
```

---

## Deployment Steps

### Step 1: Push Code to GitHub

```powershell
cd c:\Users\cbjoe\Desktop\Portfolio\ads\Ads

# Check git status
git status

# Stage changes
git add .

# Commit
git commit -m "Update timer functionality and ad components"

# Push to main
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to [github.com/yourusername/ads](https://github.com/yourusername/ads)
2. Click **Settings** (or go to `https://github.com/yourusername/ads/settings`)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**:
   - Select **Deploy from a branch**
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 3: Monitor Workflow Execution

1. Go to **Actions** tab in your repository
2. Click the latest workflow run
3. Watch the build progress
4. When complete, you'll see ✅ All checks passed

Typical build time: 1-2 minutes

### Step 4: Access Your Site

After workflow completes:

- GitHub Pages URL: `https://yourusername.github.io/ads`
- Custom domain URL: `https://ads.cbjoed.com`

Both URLs work! Custom domain is preferred.

---

## Verification & Troubleshooting

### Verify Deployment

```powershell
# 1. Check if site is live (wait 1-2 mins after workflow)
curl -I https://ads.cbjoed.com

# Expected response:
# HTTP/2 200
# Content-Type: text/html; charset=utf-8

# 2. Check workflow status
# Go to: https://github.com/yourusername/ads/actions

# 3. Check DNS resolution
nslookup ads.cbjoed.com
dig ads.cbjoed.com
```

### Common Issues & Solutions

#### ❌ Issue: "404 Page not found" or blank page

**Cause**: WASM or assets not loading

**Solutions**:
1. Check browser console (F12) for errors
2. Verify `wwwroot/` files are in `publish/` folder
3. Check workflow logs in GitHub Actions

**Fix**:
```yaml
# In .github/workflows/deploy.yml
- name: Verify publish output
  run: ls -la ./publish/wwwroot/
```

#### ❌ Issue: Custom domain not resolving

**Cause**: DNS not propagated or misconfigured

**Solutions**:
1. Wait 10-15 minutes for DNS propagation
2. Verify CNAME record at registrar:
   ```powershell
   nslookup -type=CNAME ads.cbjoed.com
   ```
3. Check record format is exactly: `ads  CNAME  yourusername.github.io`

**Verify DNS**:
```powershell
# Windows
nslookup ads.cbjoed.com

# Mac/Linux
dig ads.cbjoed.com
host ads.cbjoed.com
```

#### ❌ Issue: "Custom domain already taken"

**Cause**: Another repo has this domain in its GitHub Pages settings

**Solution**:
1. Check which repo is using it: `https://yourusername.github.io/settings/pages`
2. Remove custom domain from other repo
3. Wait 1 minute
4. Add to this repo

#### ❌ Issue: GitHub Actions workflow fails

**Cause**: Code compilation error or build configuration issue

**Steps to fix**:
1. Go to **Actions** → latest failed workflow
2. Click the job to see logs
3. Look for error messages (usually in "Build" or "Publish" steps)
4. Common fixes:
   ```powershell
   # Restore and build locally first
   cd c:\Users\cbjoe\Desktop\Portfolio\ads\Ads
   dotnet clean
   dotnet restore
   dotnet build -c Release
   ```
5. Fix errors locally, commit, and push

#### ❌ Issue: "CNAME file not found" error

**Cause**: CNAME file missing from wwwroot/

**Solution**:
Verify file exists:
```
AdsApp/wwwroot/CNAME (should contain: ads.cbjoed.com)
```

If missing, create it:
```powershell
echo "ads.cbjoed.com" > wwwroot/CNAME
git add wwwroot/CNAME
git commit -m "Add CNAME file"
git push
```

---

## Custom Domain SSL/TLS

### Automatic SSL Certificate

GitHub Pages automatically issues a free SSL certificate when you:

1. ✅ Add custom domain to repository settings
2. ✅ DNS CNAME is correctly configured
3. ✅ Wait 5-10 minutes

Check status:
- 🟡 In progress: "GitHub Pages is building your site..."
- 🟢 Complete: URL has lock icon 🔒

### HTTPS Configuration

GitHub Pages automatically redirects HTTP → HTTPS:

```
http://ads.cbjoed.com  →  https://ads.cbjoed.com
```

To enforce HTTPS in your app's `index.html`:

```html
<script>
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
</script>
```

### SSL Certificate Issues

If certificate doesn't auto-issue:

1. Check DNS is fully propagated:
   ```powershell
   nslookup ads.cbjoed.com
   ```

2. Uncheck then re-check "Enforce HTTPS" in Pages settings

3. Wait another 5-10 minutes

4. If still not working:
   - Check registrar's DNS settings
   - Verify CNAME record TTL (may need to reduce to 300-600)
   - Try removing and re-adding custom domain

---

## Production Checklist

Before going live with your app:

- [ ] DNS CNAME configured at registrar
- [ ] GitHub Pages enabled with `gh-pages` branch
- [ ] Custom domain added in Pages settings
- [ ] HTTPS certificate issued (shows 🔒)
- [ ] Workflow successfully deployed code
- [ ] Site loads at `https://ads.cbjoed.com`
- [ ] All pages and features working
- [ ] No console errors (F12 → Console)
- [ ] ads.txt file accessible at `/ads.txt`
- [ ] CNAME file deployed to `wwwroot/`
- [ ] 404.html fallback working
- [ ] Ad network code integrated (if using ads)

---

## Maintenance & Updates

### Making Changes

1. Edit files locally
2. Test with `dotnet watch run`
3. Commit and push:
   ```powershell
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. Workflow automatically deploys (check Actions tab)
5. Changes live at `https://ads.cbjoed.com` within 1-2 minutes

### Rollback Deployment

If you need to revert to a previous version:

```powershell
# Find commit hash
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit (WARNING: loses changes)
git reset --hard <commit-hash>
git push origin main --force
```

### Monitoring

Set up notifications:
1. Go to repository **Settings** → **Notifications**
2. Enable workflow notifications
3. GitHub sends email when workflows fail

---

## References

- 📚 [GitHub Pages Documentation](https://docs.github.com/pages)
- 📚 [GitHub Actions Documentation](https://docs.github.com/actions)
- 📚 [Blazor WebAssembly Hosting](https://learn.microsoft.com/aspnet/core/blazor/host-and-deploy/webassembly)
- 🔗 [DNS Record Types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)

---

## Quick Reference: Common Commands

```powershell
# Local development
dotnet watch run                          # Live reload

# Git operations
git status                                # Check changes
git add .                                 # Stage all
git commit -m "Message"                   # Commit
git push origin main                      # Push to GitHub
git log --oneline                         # View commit history

# DNS verification
nslookup ads.cbjoed.com                   # Check DNS (Windows)
dig ads.cbjoed.com                        # Check DNS (Mac/Linux)
curl -I https://ads.cbjoed.com            # Check site live

# Workflow monitoring
# Visit: https://github.com/yourusername/ads/actions
```

---

**🎉 Your app is ready to deploy to GitHub Pages!**

**Need help?** Check troubleshooting section above or GitHub's support docs.

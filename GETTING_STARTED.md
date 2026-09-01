# 🎯 Ads - Getting Started Guide

Quick start guide to build, test, and deploy your Blazor WebAssembly Pomodoro timer app.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **.NET 8.0 SDK** installed ([Download](https://dotnet.microsoft.com/download/dotnet/8.0))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **GitHub account** ([Create free account](https://github.com/join))
- [ ] **Code editor** (Visual Studio Code or Visual Studio)
- [ ] **Domain with DNS access** (e.g., ads.cbjoed.com)

Verify installation:
```powershell
dotnet --version      # Should show 8.0.x
git --version         # Should show git version
gh --version          # GitHub CLI (optional)
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Build & Run Locally

```powershell
# Navigate to project
cd c:\Users\cbjoe\Desktop\Portfolio\ads\Ads

# Restore dependencies
dotnet restore

# Run with live reload
dotnet watch run
```

**Output**:
```
Building...
Hosting environment: Development
Content root path: ...
Application started. Press Ctrl+C to exit.
Now listening on: https://localhost:5001
```

Open browser: **https://localhost:5001**

### 2. Test the App

In browser:
- ✅ Click **Start** timer button
- ✅ Add a task and mark complete
- ✅ Change ambient sound
- ✅ Modify timer settings
- ✅ Refresh page - settings persist

### 3. Create GitHub Repository

```powershell
# Initialize git (if not already done)
git init
git remote add origin https://github.com/yourusername/ads.git

# Push code
git add .
git commit -m "Initial Blazor WebAssembly app"
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to: https://github.com/yourusername/ads/settings/pages
2. **Source** → Select `gh-pages` branch
3. Save (workflow handles rest)

### 5. Configure Custom Domain

**At your domain registrar** (GoDaddy, Namecheap, etc.):

```dns
ads  CNAME  yourusername.github.io
```

**In GitHub repository settings** (Pages section):
- Custom domain: `ads.cbjoed.com`

**In repository**:
- Verify `wwwroot/CNAME` contains: `ads.cbjoed.com`

### 6. Verify Deployment

```powershell
# Wait 1-2 minutes for workflow
# Visit site
Start-Process https://ads.cbjoed.com

# Or test DNS
nslookup ads.cbjoed.com
```

---

## 📁 Project Structure

```
AdsApp/
├── Core Application
│   ├── AdsApp.csproj              # .NET 8 Blazor WASM project
│   ├── Program.cs                 # Application entry point
│   ├── App.razor                  # Root component
│   ├── Routes.razor               # Routing configuration
│   └── _Imports.razor             # Global using statements
│
├── Pages (with @page directive)
│   ├── Pages/Index.razor          # Main timer & tasks UI
│   └── Pages/NotFound.razor       # 404 fallback
│
├── Components (reusable UI)
│   └── Components/BannerAd.razor  # Ad slot component
│
├── UI Layout
│   └── Layout/MainLayout.razor    # Main page layout
│
├── Services (business logic)
│   └── Services/AdInteropService.cs   # JS Interop wrapper
│
├── Models (data structures)
│   └── Models/AppModels.cs        # TimerSettings, TaskItem
│
├── Static Files (wwwroot/)
│   ├── wwwroot/index.html         # HTML entry point
│   ├── wwwroot/404.html           # SPA routing fallback
│   ├── wwwroot/CNAME              # Custom domain config
│   ├── wwwroot/ads.txt            # Ad network verification
│   ├── wwwroot/css/
│   │   ├── app.css                # Global styles
│   │   ├── layout.css             # Layout styles
│   │   └── bootstrap/             # Bootstrap CSS
│   └── wwwroot/js/
│       └── site.js                # JavaScript Interop
│
├── Deployment
│   ├── .github/workflows/deploy.yml    # GitHub Actions CI/CD
│   ├── .gitignore                      # Git ignore rules
│   └── web.config                      # IIS configuration
│
└── Documentation
    ├── README.md                       # Full documentation
    ├── SETUP_GUIDE.md                 # Blazor setup guide
    ├── DEPLOYMENT_GUIDE.md            # GitHub Pages deployment
    ├── MONETIZATION_GUIDE.md          # Ad integration guide
    ├── CHANGELOG.md                   # Quick reference
    └── package.json                   # Package metadata
```

---

## 🔧 Common Tasks

### Modify Timer Durations

Edit `Pages/Index.razor`:

```csharp
private int WorkDurationMinutes = 25;     // Change from 25
private int BreakDurationMinutes = 5;     // Change from 5
```

Restart: `dotnet watch run`

### Change Color Scheme

Edit `wwwroot/css/app.css`:

```css
/* Change gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Or try: */
background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
```

### Add a New Page

1. Create `Pages/About.razor`:
```razor
@page "/about"

<h1>About</h1>
<p>Information about Ads app...</p>
```

2. Restart server - automatically available at `/about`

### Add Google AdSense

1. Get Publisher ID from Google AdSense: `ca-pub-XXXXXXXX`
2. Update `Components/BannerAd.razor`:
```csharp
await JS.InvokeVoidAsync("adInterop.loadAdScript", 
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID");
```
3. Add ad slot code in component markup
4. Update `wwwroot/ads.txt`
5. Commit, push, and deploy

### Deploy Changes

```powershell
# Make changes locally
dotnet watch run           # Test

# Push to GitHub
git add .
git commit -m "Description of changes"
git push origin main

# Workflow automatically builds & deploys
# Check: https://github.com/yourusername/ads/actions
```

---

## 🐛 Troubleshooting

### Problem: App won't build locally

```powershell
# Clean build
dotnet clean
dotnet restore
dotnet build
```

If still failing, check error in output - usually missing dependencies.

### Problem: Timer doesn't start

1. Open browser DevTools (F12)
2. Check **Console** tab for errors
3. Verify timer logic in `Pages/Index.razor`
4. Test locally with `dotnet watch run`

### Problem: Site shows 404 on custom routes

**Cause**: 404.html not deployed

**Fix**:
1. Verify `wwwroot/404.html` exists
2. Ensure workflow includes it
3. Check if GitHub Pages using correct source branch

### Problem: Custom domain not resolving

```powershell
# Check DNS
nslookup ads.cbjoed.com

# Should return: ads.cbjoed.com -> CNAME -> yourusername.github.io
```

If not working:
1. Wait 5-10 min for DNS propagation
2. Verify CNAME record at registrar
3. Check GitHub Pages settings

### Problem: GitHub Actions workflow failing

1. Go to: https://github.com/yourusername/ads/actions
2. Click failed workflow
3. Check logs for error messages
4. Common issues:
   - Missing .NET SDK in workflow (fixed in deploy.yml)
   - Syntax errors in C# code
   - Missing dependencies

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Complete project overview & features |
| **SETUP_GUIDE.md** | Blazor WebAssembly concepts & structure |
| **DEPLOYMENT_GUIDE.md** | GitHub Pages setup & DNS configuration |
| **MONETIZATION_GUIDE.md** | Google AdSense & ad network integration |
| **CHANGELOG.md** | Quick reference & architecture |
| **package.json** | Package metadata |

**Start with**: README.md for overview → SETUP_GUIDE.md for understanding → DEPLOYMENT_GUIDE.md for going live

---

## 🚢 Deployment Checklist

Before launching to production:

**Local Testing**
- [ ] App runs locally without errors
- [ ] Timer functionality works
- [ ] Tasks persist across reloads
- [ ] All buttons/features work on mobile
- [ ] Console shows no errors (F12)

**GitHub Setup**
- [ ] Repository created on GitHub
- [ ] Initial commit pushed to main
- [ ] .github/workflows/deploy.yml committed
- [ ] GitHub Pages enabled (gh-pages branch)

**DNS & Domain**
- [ ] Domain registered
- [ ] CNAME record created at registrar
- [ ] CNAME file exists in wwwroot/
- [ ] Custom domain added to GitHub Pages settings
- [ ] DNS resolves correctly (`nslookup ads.cbjoed.com`)
- [ ] SSL certificate issued (shows 🔒 in browser)

**Content**
- [ ] CNAME file correct
- [ ] ads.txt configured
- [ ] 404.html deployed
- [ ] Favicon present
- [ ] No broken links

**Ad Integration**
- [ ] ads.txt accessible at `/ads.txt`
- [ ] Ad network code integrated (if using ads)
- [ ] Privacy policy linked
- [ ] Ad compliance policies understood

**Final Verification**
- [ ] Site loads at `https://ads.cbjoed.com`
- [ ] All pages working
- [ ] Timer functional
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Workflow shows ✅ success

---

## 📞 Getting Help

### Documentation
- Blazor: https://learn.microsoft.com/aspnet/core/blazor
- GitHub Pages: https://docs.github.com/pages
- GitHub Actions: https://docs.github.com/actions

### Common Questions

**Q: Can I use this with a different domain?**
A: Yes! Replace `ads.cbjoed.com` with your domain in CNAME file.

**Q: How much does GitHub Pages hosting cost?**
A: Free! Public repositories get unlimited free hosting.

**Q: Can I add more features to the app?**
A: Yes! It's a standard Blazor WASM app. Add components, pages, services as needed.

**Q: How do I enable ads?**
A: See MONETIZATION_GUIDE.md for Google AdSense setup.

**Q: Is my data safe on GitHub Pages?**
A: Yes! All data stored locally in browser (localStorage), never sent to servers.

---

## 🎯 Next Steps

1. **Verify everything works locally**
   ```powershell
   dotnet watch run
   # Visit https://localhost:5001
   ```

2. **Push to GitHub**
   ```powershell
   git push origin main
   ```

3. **Monitor deployment**
   - Go to Actions tab
   - Watch workflow complete
   - Should take 1-2 minutes

4. **Access your site**
   ```powershell
   Start-Process https://ads.cbjoed.com
   ```

5. **Add monetization** (optional)
   - Sign up for Google AdSense
   - Follow MONETIZATION_GUIDE.md
   - Add ad code to BannerAd.razor

6. **Share & grow**
   - Promote your productivity app
   - Increase traffic for ad revenue
   - Improve features based on feedback

---

## 🎓 Learning Path

1. **Understand Blazor**: Read SETUP_GUIDE.md (30 min)
2. **Build locally**: Run `dotnet watch run` (15 min)
3. **Deploy to GitHub**: Follow DEPLOYMENT_GUIDE.md (15 min)
4. **Configure DNS**: Add CNAME record (5 min)
5. **Verify it works**: Visit your domain (5 min)
6. **Add monetization**: Follow MONETIZATION_GUIDE.md (30 min)

**Total time: ~2 hours from zero to live site**

---

## 💡 Tips

- 🔄 Use `dotnet watch run` for auto-reload during development
- 🔍 Check browser console (F12) when things don't work
- 📱 Test on mobile with browser DevTools device emulation
- 🚀 GitHub Actions workflow is free - let it handle deployment
- 💾 localStorage persists app data automatically
- 🔒 HTTPS is automatic with GitHub Pages
- 📊 Monitor deployment in Actions tab
- 🐛 Workflow logs show detailed build output

---

## 📝 License

MIT License - Do whatever you want with this code!

---

**Ready to go? Start with `dotnet watch run` and build something awesome! 🚀**

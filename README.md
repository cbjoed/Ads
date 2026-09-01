# 🎯 Ads - Pomodoro Study Timer with Monetization

A modern, responsive **Blazor WebAssembly** application built with .NET 8, deployed to GitHub Pages at **`ads.cbjoed.com`** with ad network integration capabilities.

## ✨ Features

- **🍅 Pomodoro Timer**: Customizable work and break durations
- **📝 Task Management**: Add, complete, and track daily tasks
- **🎵 Ambient Sounds**: Nature, rain, café, and silence options
- **📊 Session Statistics**: Track completed sessions and total focus time
- **💾 Local Storage**: All settings and tasks persist between sessions
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Beautiful UI**: Modern gradient design with smooth animations
- **📢 Ad-Ready**: Integrated ad network support for monetization
- **🌐 Custom Domain**: Hosted at `ads.cbjoed.com` via GitHub Pages

## 🛠️ Tech Stack

- **Framework**: Blazor WebAssembly (WASM) Standalone
- **Runtime**: .NET 8.0
- **Language**: C# with Razor components
- **Styling**: Bootstrap 5 + Custom CSS
- **State Management**: C# component state + localStorage
- **Deployment**: GitHub Actions → GitHub Pages
- **Ad Integration**: JS Interop for ad network scripts

## 📋 Project Structure

```
AdsApp/
├── AdsApp.csproj                 # Project file
├── Program.cs                    # Entry point
├── App.razor                     # Root component
├── Routes.razor                  # Routing configuration
├── Layout/
│   └── MainLayout.razor         # Main layout component
├── Pages/
│   ├── Index.razor              # Home page with timer & tasks
│   └── NotFound.razor           # 404 fallback
├── Components/
│   └── BannerAd.razor           # Ad banner component
├── Services/
│   └── AdInteropService.cs      # JS Interop service
├── Models/
│   └── AppModels.cs             # Data models
├── wwwroot/
│   ├── index.html               # HTML entry point
│   ├── CNAME                    # Custom domain config
│   ├── ads.txt                  # Ad network verification
│   ├── 404.html                 # Client-side routing fallback
│   ├── css/
│   │   ├── app.css              # Global styles
│   │   ├── layout.css           # Layout styles
│   │   └── bootstrap/           # Bootstrap framework
│   └── js/
│       └── site.js              # JS Interop functions
└── .github/
    └── workflows/
        └── deploy.yml           # GitHub Actions workflow
```

## 🚀 Getting Started

### Prerequisites

- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Git** - [Download](https://git-scm.com/)
- **Visual Studio Code** or **Visual Studio** (optional but recommended)

### Installation & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ads.git
   cd ads/Ads
   ```

2. **Restore dependencies**:
   ```bash
   dotnet restore
   ```

3. **Run the development server**:
   ```bash
   dotnet watch run
   ```

   The app will be available at `https://localhost:5001` (or your configured port).

4. **Build for production**:
   ```bash
   dotnet publish -c Release -o ./publish
   ```

## 🌐 DNS Configuration for Custom Domain

To use your custom domain (`ads.cbjoed.com`), configure these DNS records:

### Option 1: Using CNAME (Recommended for subdomains)
Create a **CNAME** record in your DNS provider:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| CNAME | ads  | yourusername.github.io         |

### Option 2: Using A Records (For root domain only)
If hosting at the root domain (e.g., `cbjoed.com`), use GitHub's A records:

| Type | Name | Value         |
|------|------|---------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

**Verification**:
```bash
nslookup ads.cbjoed.com
# or
dig ads.cbjoed.com
```

## 📱 Ad Network Integration

The app includes built-in support for popular ad networks:

### Google AdSense

1. Sign up at [Google AdSense](https://www.google.com/adsense/)
2. Get your publisher ID (e.g., `ca-pub-xxxxxxxxxxxxxxxx`)
3. Uncomment the ad script loader in `BannerAd.razor`:

   ```csharp
   protected override async Task OnAfterRenderAsync(bool firstRender)
   {
       if (firstRender)
       {
           await JS.InvokeVoidAsync("adInterop.loadAdScript", 
               "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID");
       }
       await base.OnAfterRenderAsync(firstRender);
   }
   ```

4. Update the `BannerAd.razor` component to include your AdSense ad code:

   ```html
   <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
   </script>
   ```

### Other Ad Networks
- **Mediavine, Appnexus, Propellerads**: Modify `adInterop.loadAdScript()` and update ad slots accordingly
- **Use `wwwroot/ads.txt`**: Add your ad network authorization records

## 🚀 Deployment to GitHub Pages

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial Blazor WASM app setup"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository settings
2. Scroll to **Pages**
3. Set **Source** to `GitHub Actions`
4. Click **Save**

### 3. GitHub Actions Workflow

The `.github/workflows/deploy.yml` automatically:
- Builds the Blazor WASM project in Release mode
- Uploads the publish output as a GitHub Pages artifact
- Includes `CNAME` file for custom domain
- Deploys the static files to GitHub Pages

**Workflow Features**:
- ✅ Runs on push to `main` branch
- ✅ Includes 404.html fallback for client-side routing
- ✅ Preserves CNAME and ads.txt files
- ✅ Uses official `actions/deploy-pages@v4`

### 4. Verify Deployment

After the workflow completes:
```bash
curl -I https://ads.cbjoed.com
# Should return 200 OK
```

## 🔧 Configuration

### Timer Settings

Customize default durations in `Pages/Index.razor`:

```csharp
private int WorkDurationMinutes = 25;      // Default work session
private int BreakDurationMinutes = 5;      // Default break
```

### Styling

Global styles: `wwwroot/css/app.css`
Layout styles: `wwwroot/css/layout.css`

To customize colors, update the gradient in `app.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Sound Files

To add ambient sounds, place audio files in `wwwroot/sounds/`:
- `nature.mp3`
- `rain.mp3`
- `cafe.mp3`

Then update `Pages/Index.razor` line that plays sounds:
```csharp
await JS.InvokeVoidAsync("adInterop.playSound", $"sounds/{sound}.mp3", 0.3);
```

## 💾 Local Storage Keys

The app uses these localStorage keys:
- `timerSettings` - Pomodoro settings and statistics
- `taskList` - User's task list

Clear all data:
```javascript
localStorage.clear();
location.reload();
```

## 🐛 Troubleshooting

### "404 Page Not Found" on custom routes
- Ensure `404.html` is deployed to GitHub Pages
- Check that the workflow includes the 404.html fallback
- Verify custom domain CNAME is correctly configured

### Ads not loading
- Verify your ad network script URL is correct
- Check browser console for script loading errors
- Ensure ad slot IDs match your ad network account

### Settings not persisting
- Check browser's localStorage quota (usually 5-10MB)
- Verify localStorage is enabled in browser settings
- Clear browser cache and try again

### Custom domain not resolving
- Wait 5-10 minutes for DNS propagation
- Check DNS records with `nslookup` or `dig`
- Verify CNAME or A records are correctly configured in DNS provider

## 📝 Build & Publishing Details

### Release Build Output
```
publish/
└── wwwroot/           # Static files for GitHub Pages
    ├── index.html     # Entry point
    ├── _framework/    # Blazor WASM runtime
    ├── css/
    ├── js/
    ├── CNAME          # Custom domain
    ├── ads.txt        # Ad network verification
    └── 404.html       # Routing fallback
```

### JavaScript Interop Functions (`window.adInterop`)

```javascript
// Load external ad network script
adInterop.loadAdScript(scriptUrl)

// Refresh ads from ad network
adInterop.refreshAds(adNetwork)

// Play sound with volume control
adInterop.playSound(audioUrl, volume)

// Stop all playing sounds
adInterop.stopAllSounds()

// localStorage access
adInterop.getLocalStorageData(key)
adInterop.setLocalStorageData(key, value)
adInterop.removeLocalStorageData(key)
```

## 📊 Performance Optimizations

- **PublishTrimmed=true**: Reduces binary size by trimming unused code
- **InvariantGlobalization=false**: Enables culture-specific operations
- **Service Worker**: PWA capabilities for offline support (optional)
- **CSS/JS Minification**: Automatic during Release build
- **Compression**: GitHub Pages automatically compresses assets (gzip)

## 🔒 Privacy & Security

- **No backend server**: Static hosting on GitHub Pages
- **No cookies**: Uses only localStorage (client-side)
- **No tracking**: No external analytics by default
- **HTTPS only**: GitHub Pages provides free HTTPS/TLS
- **ads.txt**: Standard file for ad transparency

## 📄 License

Specify your license (MIT, Apache 2.0, etc.)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Create a [GitHub Issue](https://github.com/yourusername/ads/issues)
- Check [Blazor Documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/)
- Review [GitHub Pages Docs](https://docs.github.com/en/pages)

## 🙏 Acknowledgments

- [Blazor WebAssembly](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor)
- [Bootstrap](https://getbootstrap.com/)
- [GitHub Pages](https://pages.github.com/)

---

**Happy coding! 🚀 Boost your productivity with Ads!**

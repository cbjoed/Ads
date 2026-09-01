# Blazor WebAssembly .NET 8 Project

This is a complete, production-ready **Blazor WebAssembly** application built with .NET 8.

## Quick Reference

| Item | Value |
|------|-------|
| **Framework** | Blazor WebAssembly |
| **.NET Version** | 8.0 |
| **SDK** | Microsoft.NET.Sdk.BlazorWebAssembly |
| **Hosting** | GitHub Pages (Static) |
| **Custom Domain** | ads.cbjoed.com |
| **Runtime** | WebAssembly |

## Prerequisites

### System Requirements
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Git** - [Download](https://git-scm.com/)
- **A code editor**:
  - Visual Studio Code + C# Extension
  - Visual Studio 2022+
  - JetBrains Rider

### Verify Installation
```powershell
dotnet --version          # Should show 8.0.x
dotnet workload list      # Should include "wasm-tools"
```

If `wasm-tools` is missing:
```powershell
dotnet workload install wasm-tools
```

## Project Structure Explanation

```
AdsApp/
├── AdsApp.csproj              # Project configuration
│   └── <TargetFramework>net8.0</TargetFramework>
│   └── Microsoft.NET.Sdk.BlazorWebAssembly
│
├── Program.cs                 # Application entry point
│   └── WebAssemblyHostBuilder
│   └── RootComponents.Add<App>
│
├── App.razor                  # Root component (wrapper)
├── Routes.razor               # Routing configuration
├── _Imports.razor             # Global using statements
│
├── Pages/                     # Page components (@page directive)
│   ├── Index.razor            # Timer & tasks (/)
│   └── NotFound.razor         # 404 fallback
│
├── Components/                # Reusable components (no @page)
│   └── BannerAd.razor         # Ad banner
│
├── Layout/                    # Layout components
│   └── MainLayout.razor       # Main layout wrapper
│
├── Services/                  # Business logic services
│   └── AdInteropService.cs    # JS Interop wrapper
│
├── Models/                    # Data models
│   └── AppModels.cs           # TimerSettings, TaskItem
│
├── wwwroot/                   # Static files (public)
│   ├── index.html             # HTML host document
│   ├── 404.html               # Fallback for SPA routing
│   ├── CNAME                  # Custom domain (GitHub Pages)
│   ├── ads.txt                # Ad network verification
│   ├── favicon.ico            # Site icon
│   ├── css/
│   │   ├── app.css            # Global styles
│   │   ├── layout.css         # Layout-specific styles
│   │   └── bootstrap/         # Bootstrap framework
│   └── js/
│       └── site.js            # JS Interop functions
│
└── .github/workflows/
    └── deploy.yml             # GitHub Actions CI/CD
```

## Core Files Explained

### AdsApp.csproj
```xml
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <PublishTrimmed>true</PublishTrimmed>  <!-- Remove unused code -->
  </PropertyGroup>
</Project>
```

### Program.cs
Configures the Blazor WASM host:
- Creates `WebAssemblyHostBuilder`
- Registers root components (`App`, `HeadOutlet`)
- Configures services (HttpClient)
- Runs the host

### App.razor
Root component that:
- Wraps entire application
- Contains HTML structure
- References CSS/JS
- Renders Routes component

### Routes.razor
Handles routing:
- Scans assembly for `@page` directives
- Renders `RouteView` for matched pages
- Falls back to `NotFound` component
- Sets page title with `<PageTitle>`

## Key Blazor Concepts

### Components
Razor components (`.razor` files) combine HTML, CSS, and C#:

```razor
@* Markup *@
<button @onclick="Increment">Click: @count</button>

@* C# Code *@
@code {
    int count = 0;
    void Increment() => count++;
}
```

### Routing
```razor
@page "/"              # Component loads at root
@page "/timer/{id}"   # Dynamic parameter
```

### Data Binding
```razor
<input @bind="Name" />                    @* Two-way binding *@
<input @bind:event="oninput" @bind="Text" />  @* Real-time *@
```

### Event Handling
```razor
<button @onclick="HandleClick">Click</button>
<input @onchange="HandleChange" />
<form @onsubmit="HandleSubmit">
```

### JS Interop
```csharp
[Inject] IJSRuntime JS { get; set; }

await JS.InvokeVoidAsync("jsFunctionName", param1, param2);
var result = await JS.InvokeAsync<ReturnType>("functionName");
```

### State Management
- **Component State**: `@code` block properties
- **Cascading Parameters**: Pass data down component tree
- **localStorage**: Persist data client-side
- **Services**: Dependency injection

## Common Commands

```powershell
# Development
dotnet watch run                      # Live reload server
dotnet run                            # Standard run
dotnet build                          # Build only

# Publishing
dotnet publish -c Release -o publish  # Production build

# Cleanup
dotnet clean                          # Remove build artifacts
rm -r bin,obj                         # Full clean
```

## JavaScript Interop Reference

From `wwwroot/js/site.js`:

```javascript
window.adInterop = {
    loadAdScript(scriptUrl),
    refreshAds(adNetwork),
    playSound(audioUrl, volume),
    stopAllSounds(),
    getLocalStorageData(key),
    setLocalStorageData(key, value),
    removeLocalStorageData(key)
};
```

Called from C# via `IJSRuntime`:
```csharp
await JS.InvokeVoidAsync("adInterop.loadAdScript", "https://...");
string data = await JS.InvokeAsync<string>("adInterop.getLocalStorageData", "key");
```

## Deployment Workflow

GitHub Actions (`.github/workflows/deploy.yml`):

1. **Trigger**: Push to `main` branch
2. **Setup .NET**: Install SDK
3. **Build**: `dotnet publish -c Release`
4. **Upload**: Publish folder to GitHub Pages
5. **Deploy**: Push to `gh-pages` branch

Result: Static files automatically deployed to `https://ads.cbjoed.com`

## Customization Points

### Change App Name
1. Update `<AssemblyName>` in `AdsApp.csproj`
2. Update namespace in C# files
3. Update `package.json`

### Change Color Scheme
Edit `wwwroot/css/app.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add New Page
1. Create `Pages/NewPage.razor`
2. Add `@page "/path"` directive
3. Create component markup and code

### Add New Service
1. Create `Services/MyService.cs`
2. Register in `Program.cs`: `builder.Services.AddScoped<MyService>();`
3. Inject in components: `@inject MyService Service`

## Performance Tips

- ✅ Use `PublishTrimmed=true` in `.csproj`
- ✅ Lazy load components with `@key`
- ✅ Use `@rendermode="InteractiveWebAssembly"` strategically
- ✅ Minimize initial WASM bundle size
- ✅ Cache API responses
- ✅ Use `IsKeyValueReadOnly` for readonly collections

## Debugging

### Browser Console
```javascript
// Check what's happening in JS Interop
console.log("Message from C#");
debugger;  // Break in DevTools
```

### VS Code Debugging
1. Install C# extension
2. Press F5 to start debugging
3. Set breakpoints in `.cs` or `.razor` files
4. Browser DevTools works alongside

## Resources

- 📚 [Blazor Documentation](https://learn.microsoft.com/aspnet/core/blazor)
- 🎥 [Microsoft Learn Modules](https://learn.microsoft.com/training/browse/?products=aspnet-core)
- 💬 [Blazor GitHub Discussions](https://github.com/dotnet/aspnetcore/discussions)
- 🐛 [Report Issues](https://github.com/dotnet/aspnetcore/issues)

## Next Steps

1. ✅ Run locally: `dotnet watch run`
2. ✅ Test UI: Visit https://localhost:5001
3. ✅ Modify components: Edit `.razor` files
4. ✅ Push to GitHub: Workflow deploys automatically
5. ✅ Check deployment: Visit https://ads.cbjoed.com

---

**Happy coding with Blazor WebAssembly! 🎉**

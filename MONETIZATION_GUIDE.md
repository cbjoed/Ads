# 💰 Ad Monetization & Integration Guide

Complete guide for integrating ad networks into your Blazor WebAssembly application.

## Table of Contents

1. [Overview](#overview)
2. [Google AdSense Setup](#google-adsense-setup)
3. [Other Ad Networks](#other-ad-networks)
4. [ads.txt Configuration](#adstxt-configuration)
5. [Implementation Examples](#implementation-examples)
6. [Performance & Best Practices](#performance--best-practices)
7. [Monitoring & Revenue](#monitoring--revenue)

---

## Overview

### Ad Integration Architecture

```
User Browser
    ↓
Blazor WASM App (AdsApp)
    ↓
JavaScript Interop (adInterop)
    ↓
Ad Network (Google AdSense, etc.)
    ↓
Ad Impressions → Revenue Tracking
```

### Key Files

- **[Components/BannerAd.razor](Components/BannerAd.razor)** - Ad slot component
- **[Services/AdInteropService.cs](Services/AdInteropService.cs)** - JS Interop wrapper
- **[wwwroot/js/site.js](wwwroot/js/site.js)** - JavaScript ad functions
- **[wwwroot/ads.txt](wwwroot/ads.txt)** - Ad network verification
- **[Pages/Index.razor](Pages/Index.razor)** - App with ad placements

---

## Google AdSense Setup

### Step 1: Apply for Google AdSense

1. Go to [google.com/adsense](https://google.com/adsense)
2. Click **SIGN UP NOW**
3. Sign in with Google Account (create one if needed)
4. Enter website details:
   - **Website**: `https://ads.cbjoed.com`
   - **Language**: English
   - **Content Category**: Productivity/Tools
5. Accept terms and click **Next**

### Step 2: Verify Website Ownership

1. Google will ask to verify ownership
2. Add this meta tag to `wwwroot/index.html` `<head>`:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
3. Deploy to GitHub Pages
4. Return to AdSense and click **Verify**

### Step 3: Get Publisher ID & Ad Slots

1. Once approved (24-72 hours):
2. Go to **AdSense Dashboard** → **Ads** → **Ad Units**
3. Click **New Ad Unit**
4. Select **Display Ads**
5. Name: "Header Banner" (or your choice)
6. Size: 728x90 (leaderboard) or responsive
7. Copy your **Publisher ID** and **Ad Slot ID**

Example Publisher ID: `ca-pub-1234567890123456`
Example Ad Slot ID: `9876543210`

---

## Other Ad Networks

### Mediavine

**Eligibility**: 50,000+ monthly pageviews

```javascript
// In wwwroot/js/site.js
window.mediavineConfig = {
    domain: 'ads.cbjoed.com'
};

// Load script
<script src="https://www.mediavine.com/tags/YOUR_SITE_ID.js" async></script>
```

### Appnexus/Xandr

```javascript
// Add to ads.txt
appnexus.com, YOUR_MEMBER_ID, DIRECT
```

### Propellerads

```html
<!-- Copy embed code from Propellerads dashboard -->
<script type="text/javascript" src="https://www.propellerads.com/js/YOUR_ZONE_ID.js"></script>
```

### Amazon Associates

```html
<!-- Copy link to product or ad code -->
<a href="https://www.amazon.com/gp/search?ie=UTF8&keywords=YOUR_PRODUCT">
    Check on Amazon
</a>
```

---

## ads.txt Configuration

### What is ads.txt?

Advertisers use `ads.txt` to verify authorized sellers of your ad space. Required for premium ad rates.

### File Location

```
wwwroot/ads.txt (automatically deployed to: https://ads.cbjoed.com/ads.txt)
```

### Format

```
# Contact info (optional but recommended)
# Contact: publisher@cbjoed.com
# Hotline: https://cbjoed.com/contact

# Google AdSense
google.com, pub-YOUR_PUBLISHER_ID, DIRECT, f08c47fec0942fa0

# Google Ad Manager
googlesyndication.com, YOUR_PUB_ID, DIRECT, f08c47fec0942fa0

# Facebook Audience Network
facebook.com, YOUR_PLACEMENT_ID, DIRECT, c3e20eea835e46c8

# Amazon Publisher Services
amazon-adsystem.com, YOUR_ACCOUNT_ID, DIRECT

# Mediavine (if applicable)
mediavine.com, YOUR_SITE_ID, DIRECT

# Resellers (if working with ad network partners)
adnetwork.com, YOUR_ACCOUNT_ID, RESELLER
```

### Update ads.txt

1. Edit `wwwroot/ads.txt`
2. Add your ad network lines
3. Commit and push:
   ```powershell
   git add wwwroot/ads.txt
   git commit -m "Update ads.txt with ad network configs"
   git push origin main
   ```
4. Verify deployment:
   ```powershell
   curl https://ads.cbjoed.com/ads.txt
   ```

---

## Implementation Examples

### Example 1: Google AdSense Display Ad

**Step 1**: Update `Components/BannerAd.razor`:

```razor
@namespace AdsApp.Components
@inject IJSRuntime JS

<div class="banner-ad-container">
    <div class="banner-ad-inner">
        <div class="ad-slot" id="ad-slot-top">
            <!-- Google AdSense ad code -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                 data-ad-slot="YOUR_AD_SLOT_ID"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
    </div>
</div>

@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // Load Google AdSense script
            await JS.InvokeVoidAsync("adInterop.loadAdScript", 
                "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID");
            
            // Push ad unit
            await Task.Delay(100);
            await JS.InvokeVoidAsync("eval", "(adsbygoogle = window.adsbygoogle || []).push({});");
        }
        await base.OnAfterRenderAsync(firstRender);
    }
}

<style>
.banner-ad-container {
    width: 100%;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    text-align: center;
    min-height: 250px;
}

.banner-ad-inner {
    min-height: 250px;
}
</style>
```

**Step 2**: Replace placeholders:
- `ca-pub-YOUR_PUBLISHER_ID` → Your Google Publisher ID
- `YOUR_AD_SLOT_ID` → Your AdSense Ad Slot ID

**Step 3**: Deploy:
```powershell
git add Components/BannerAd.razor
git commit -m "Add Google AdSense ad unit"
git push origin main
```

### Example 2: Responsive Leaderboard Banner

```razor
@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // Load AdSense
            await JS.InvokeVoidAsync("adInterop.loadAdScript", 
                "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID");
        }
    }
}

<style>
.adsbygoogle {
    display: block !important;
    width: 100%;
    max-width: 728px;
    height: auto;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .adsbygoogle {
        max-width: 320px;
    }
}
</style>
```

### Example 3: Multiple Ad Slots

```razor
<!-- Header Ad -->
<BannerAd SlotId="9876543210" />

<!-- Main content -->
<div class="container">
    <!-- Your app content -->
</div>

<!-- Footer Ad -->
<BannerAd SlotId="1234567890" />

@code {
    [Parameter]
    public string SlotId { get; set; } = "";
}
```

### Example 4: Refresh Ads Dynamically

In `Pages/Index.razor`:

```csharp
private async Task RefreshAdNetwork()
{
    // Trigger ad network refresh (for ad rotations)
    await JS.InvokeVoidAsync("adInterop.refreshAds", "google");
}

// Call after navigation or after timer completes
private async Task CompleteSession()
{
    // ... existing code ...
    
    // Refresh ads for new impressions
    await RefreshAdNetwork();
}
```

---

## Performance & Best Practices

### 1. Load Ad Scripts Asynchronously

```csharp
// ✅ Good - Async loading
protected override async Task OnAfterRenderAsync(bool firstRender)
{
    if (firstRender)
    {
        await JS.InvokeVoidAsync("adInterop.loadAdScript", scriptUrl);
    }
}

// ❌ Bad - Blocks app rendering
await JS.InvokeVoidAsync("adInterop.loadAdScript", scriptUrl);
```

### 2. Lazy Load Ads Below the Fold

```html
<!-- Only show ads when user scrolls -->
<div id="ads-container">
    <!-- Ads load here only when visible -->
</div>

<script>
// Intersection Observer for lazy ad loading
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    });
});

observer.observe(document.getElementById('ads-container'));
</script>
```

### 3. Avoid Ad Overlap

```css
/* Good ad spacing */
.banner-ad-container {
    margin: 2rem 0;          /* Separation from content */
    padding: 1rem;           /* Internal padding */
    border-radius: 8px;      /* Rounded corners */
    background: #f9f9f9;     /* Light background */
}

/* Avoid: overlapping ads
.banner-ad-container {
    position: absolute;      /* ❌ Bad */
    z-index: 999;            /* ❌ Bad */
}
*/
```

### 4. Optimize Ad Sizes

```
Responsive (best for mobile):
- 300x250 (Medium Rectangle) - Desktop
- 320x50 (Mobile Banner) - Mobile
- 728x90 (Leaderboard) - Desktop

Use data-full-width-responsive="true" for automatic sizing
```

### 5. Track Ad Impressions

```csharp
private int AdImpressionsCount = 0;

protected override async Task OnAfterRenderAsync(bool firstRender)
{
    if (firstRender)
    {
        AdImpressionsCount++;
        await JS.InvokeVoidAsync("adInterop.setLocalStorageData", 
            "adImpressions", AdImpressionsCount.ToString());
    }
}
```

---

## Monitoring & Revenue

### Google AdSense Dashboard

1. Go to [google.com/adsense](https://google.com/adsense)
2. View **Performance reports**:
   - **Impressions**: Number of ads shown
   - **Clicks**: User clicks on ads
   - **CTR** (Click-Through Rate): Clicks ÷ Impressions
   - **CPM** (Cost Per Mille): Revenue per 1000 impressions
   - **RPM** (Revenue Per Mille): Your actual earnings per 1000 impressions

### Key Metrics

| Metric | Healthy Range | Meaning |
|--------|---------------|---------|
| **CTR** | 0.5% - 3% | How many users click ads |
| **CPM** | $0.50 - $5.00 | What advertisers pay per 1000 views |
| **RPM** | $0.25 - $3.00 | Your earnings per 1000 views |

### Improving Revenue

1. **Increase traffic**: Drive more users to your site
2. **Optimize ad placement**: Place ads in high-visibility areas
3. **Improve CTR**: Make ads more relevant to content
4. **Target valuable regions**: Traffic from US/UK/Canada worth more
5. **Comply with policies**: Follow ad network guidelines to avoid suspension
6. **Diverse ad networks**: Use multiple networks for best CPM rates

### Troubleshooting Low Earnings

| Issue | Solution |
|-------|----------|
| **No impressions** | Verify ad code deployed correctly |
| **High impressions, low clicks** | Ad placement may be poor; try different sizes/positions |
| **Low CPM** | Traffic from lower-value regions; focus on US/UK traffic |
| **Ads not showing** | Check browser ad blocker; verify ad unit ID in code |

---

## Ad Network Compliance

### Google AdSense Policies

- ✅ Original content on site
- ✅ No click fraud or incentivized clicks
- ✅ No deceptive ads
- ✅ No malware or viruses
- ✅ Privacy policy linked from site
- ❌ No excessive ad density
- ❌ No ad placement near adult content

### Privacy Policy Template

Create `wwwroot/privacy.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Privacy Policy</title>
</head>
<body>
    <h1>Privacy Policy</h1>
    <p>
        This website uses Google AdSense to serve ads. 
        Google uses cookies to serve ads based on prior visits to this website.
        Users can opt out of Google's use of cookies by visiting the 
        <a href="https://www.google.com/settings/ads">Google Ads Settings</a>.
    </p>
    <p>
        Your privacy is important to us. We do not collect personal information 
        beyond what is necessary for site operations.
    </p>
</body>
</html>
```

Link from `wwwroot/index.html`:
```html
<footer>
    <a href="/privacy.html">Privacy Policy</a>
</footer>
```

---

## Revenue Sharing with Affiliates

### Amazon Associates

```html
<div class="affiliate-link">
    <a href="https://www.amazon.com/gp/search?ie=UTF8&keywords=productivity+timer&tag=YOUR_ASSOCIATE_TAG">
        Recommended: Productivity Timer on Amazon
    </a>
</div>
```

Replace `YOUR_ASSOCIATE_TAG` with your Amazon Associate ID.

### Affiliate Link Best Practices

1. ✅ Disclose affiliate relationships
2. ✅ Only promote relevant products
3. ✅ Use natural, helpful links
4. ✅ Don't overwhelm content with links
5. ✅ Test link functionality regularly

---

## Quick Monetization Setup Checklist

- [ ] Google AdSense account created
- [ ] Website verified with Google
- [ ] Ad unit created and approved
- [ ] Publisher ID obtained: `ca-pub-XXXXXXXXX`
- [ ] Ad Slot ID obtained: `XXXXXXXXX`
- [ ] Google AdSense script added to `BannerAd.razor`
- [ ] `wwwroot/ads.txt` updated with ad network lines
- [ ] Privacy policy created and linked
- [ ] Custom domain SSL verified (https)
- [ ] ads.txt file deployed and accessible
- [ ] Ad unit tested in browser (F12 DevTools)
- [ ] Revenue monitoring enabled
- [ ] Compliance policies read and understood

---

## Resources

- 📚 [Google AdSense Help](https://support.google.com/adsense)
- 📚 [ads.txt Specification](https://iabtechlab.com/ads-txt/)
- 📚 [AdSense Policies](https://support.google.com/adsense/answer/48182)
- 📊 [Google Ad Manager](https://admanager.google.com/)

---

**🎉 Ready to monetize your app! Start with Google AdSense and scale from there.**

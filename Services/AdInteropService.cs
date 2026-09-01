namespace AdsApp.Services;

using Microsoft.JSInterop;

public class AdInteropService
{
    private readonly IJSRuntime _js;

    public AdInteropService(IJSRuntime js)
    {
        _js = js;
    }

    /// <summary>
    /// Load an external ad network script
    /// </summary>
    public async Task LoadAdScriptAsync(string scriptUrl)
    {
        await _js.InvokeVoidAsync("adInterop.loadAdScript", scriptUrl);
    }

    /// <summary>
    /// Trigger ad network refresh
    /// </summary>
    public async Task RefreshAdsAsync(string adNetwork = "google")
    {
        await _js.InvokeVoidAsync("adInterop.refreshAds", adNetwork);
    }

    /// <summary>
    /// Play ambient sound with volume control
    /// </summary>
    public async Task PlaySoundAsync(string audioUrl, double volume = 0.5)
    {
        await _js.InvokeVoidAsync("adInterop.playSound", audioUrl, volume);
    }

    /// <summary>
    /// Stop all playing sounds
    /// </summary>
    public async Task StopAllSoundsAsync()
    {
        await _js.InvokeVoidAsync("adInterop.stopAllSounds");
    }

    /// <summary>
    /// Get data from localStorage
    /// </summary>
    public async Task<string?> GetLocalStorageDataAsync(string key)
    {
        return await _js.InvokeAsync<string>("adInterop.getLocalStorageData", key);
    }

    /// <summary>
    /// Set data in localStorage
    /// </summary>
    public async Task SetLocalStorageDataAsync(string key, string value)
    {
        await _js.InvokeVoidAsync("adInterop.setLocalStorageData", key, value);
    }

    /// <summary>
    /// Remove data from localStorage
    /// </summary>
    public async Task RemoveLocalStorageDataAsync(string key)
    {
        await _js.InvokeVoidAsync("adInterop.removeLocalStorageData", key);
    }
}

// JavaScript Interop for ad network integration and utilities

window.adInterop = {
    // Load external ad network script
    loadAdScript: function (scriptUrl) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        document.head.appendChild(script);
        return Promise.resolve();
    },

    // Trigger ad refresh from ad network
    refreshAds: function (adNetwork) {
        if (window.adsByGoogle !== undefined) {
            // Google AdSense
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
        return Promise.resolve();
    },

    // Play sound with volume control
    playSound: function (audioUrl, volume = 0.5) {
        const audio = new Audio(audioUrl);
        audio.volume = volume;
        audio.play();
        return Promise.resolve();
    },

    // Stop all playing sounds
    stopAllSounds: function () {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        return Promise.resolve();
    },

    // Get localStorage data
    getLocalStorageData: function (key) {
        return localStorage.getItem(key);
    },

    // Set localStorage data
    setLocalStorageData: function (key, value) {
        localStorage.setItem(key, value);
        return Promise.resolve();
    },

    // Remove localStorage data
    removeLocalStorageData: function (key) {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
};

document.addEventListener('keydown', function (event) {
    if (event.key == "Escape") {
        const errorUi = document.getElementById('blazor-error-ui');
        if (errorUi) {
            errorUi.style.display = 'none';
        }
    }
});

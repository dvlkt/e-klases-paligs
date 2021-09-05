chrome.storage.sync.get(`theme`, (res) => {
    if (res.theme === `dark`) {
        document.body.className = `dark-theme`;
        darkThemeBtn.className += ` theme-selected`;
    } else {
        document.body.className = `light-theme`;
        lightThemeBtn.className += ` theme-selected`;
    }
});
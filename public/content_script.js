// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
    // Send message to background script to open the popup
    chrome.runtime.sendMessage({ action: 'showPopup' });
});

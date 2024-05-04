
  chrome.action.onClicked.addListener(() => {
    // Send message to all tabs to create the iframe
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'createFloatingIframe' });
      }
    });
  });
     
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const iframeConfig = {
      src: chrome.runtime.getURL("iframe.html"), // Replace with your desired iframe source
      width: "300px",
      height: "200px",
      position: "absolute",
      top: "100px",
      left: "100px",
      border: "none",
      backgroundColor: 'red',
      zIndex: 99999, // Ensure iframe stays on top of most elements
    };
    console.log("Content script injected!");


    if (message.action === 'createFloatingIframe') {
      const iframe = document.createElement('iframe');
      console.log("Iframe created!", iframe);
      // Set iframe properties (src, styles)
      for (const key in iframeConfig) {
        iframe.setAttribute(key, iframeConfig[key]);
      }
      document.body.appendChild(iframe);
    }
  });
  
// Initialize feature states on install
chrome.runtime.onInstalled.addListener(() => {
  fetch(chrome.runtime.getURL('features.json'))
    .then(response => response.json())
    .then(data => {
      chrome.storage.local.get(['featureStates'], (result) => {
        const states = result.featureStates || {};
        data.features.forEach(feature => {
          if (states[feature.id] === undefined) {
            states[feature.id] = feature.enabled;
          }
        });
        chrome.storage.local.set({ featureStates: states });
      });
    });
});

// Monitor tab updates for redirects
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const url = changeInfo.url;
    
    chrome.storage.local.get(['featureStates'], (result) => {
      const states = result.featureStates || {};
      
      // Fandom English Force logic
      if (states['fandom_english_force']) {
        const fandomRegex = /^(https?:\/\/[^/]+\.fandom\.com)\/([a-z]{2,3})\/wiki\/(.*)$/i;
        const match = url.match(fandomRegex);
        
        if (match) {
          const baseUrl = match[1];
          const pagePath = match[3];
          const newUrl = `${baseUrl}/wiki/${pagePath}`;
          
          console.log(`[Fandom English Force] Redirecting to ${newUrl}`);
          chrome.tabs.update(tabId, { url: newUrl });
        }
      }
    });
  }
});

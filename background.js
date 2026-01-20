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
          return; // Stop further processing for this URL update
        }
      }

      // Google Comma to Dot logic
      if (states['google_comma_to_dot']) {
        const googleUrl = new URL(url);
        if (googleUrl.hostname.includes('google.com') && googleUrl.pathname === '/search') {
          const query = googleUrl.searchParams.get('q');
          if (query && query.includes(',')) {
            const newQuery = query.replace(/,/g, '.');
            googleUrl.searchParams.set('q', newQuery);
            const newUrl = googleUrl.toString();
            
            console.log(`[Google Comma to Dot] Redirecting to ${newUrl}`);
            chrome.tabs.update(tabId, { url: newUrl });
          }
        }
      }
    });
  }
});

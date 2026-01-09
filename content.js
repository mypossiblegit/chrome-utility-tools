chrome.storage.local.get(['featureStates'], (result) => {
  const states = result.featureStates || {};
  fetch(chrome.runtime.getURL('features.json'))
    .then(response => response.json())
    .then(data => {
      data.features.forEach(feature => {
        if (states[feature.id]) {
          const script = document.createElement('script');
          script.src = chrome.runtime.getURL(feature.script);
          (document.head || document.documentElement).appendChild(script);
        }
      });
    });
});

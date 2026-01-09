(function() {
  chrome.storage.local.get(['featureStates'], (result) => {
    const states = result.featureStates || {};
    
    fetch(chrome.runtime.getURL('features.json'))
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          const isEnabled = states[feature.id] !== undefined ? states[feature.id] : feature.enabled;
          
          if (isEnabled) {
            // Use a more reliable way to execute the feature script in the content script context
            fetch(chrome.runtime.getURL(feature.script))
              .then(response => response.text())
              .then(code => {
                try {
                  eval(code);
                } catch (e) {
                  console.error(`Error executing feature ${feature.id}:`, e);
                }
              });
          }
        });
      })
      .catch(err => console.error('Error loading features.json:', err));
  });
})();

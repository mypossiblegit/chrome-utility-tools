chrome.runtime.onInstalled.addListener(() => {
  fetch(chrome.runtime.getURL('features.json'))
    .then(response => response.json())
    .then(data => {
      const initialState = {};
      data.features.forEach(feature => {
        initialState[feature.id] = feature.enabled;
      });
      chrome.storage.local.set({ featureStates: initialState });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const featureList = document.getElementById('feature-list');

  // Load features from JSON
  fetch(chrome.runtime.getURL('features.json'))
    .then(response => response.json())
    .then(data => {
      chrome.storage.local.get(['featureStates'], (result) => {
        const states = result.featureStates || {};

        data.features.forEach(feature => {
          const isEnabled = states[feature.id] !== undefined ? states[feature.id] : feature.enabled;
          
          const item = document.createElement('div');
          item.className = 'feature-item';
          item.innerHTML = `
            <div class="feature-info">
              <div class="feature-name">${feature.name}</div>
              <div class="feature-desc">${feature.description}</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="${feature.id}" ${isEnabled ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          `;
          featureList.appendChild(item);

          // Add toggle listener
          document.getElementById(feature.id).addEventListener('change', (e) => {
            states[feature.id] = e.target.checked;
            chrome.storage.local.set({ featureStates: states });
          });
        });
      });
    });
});

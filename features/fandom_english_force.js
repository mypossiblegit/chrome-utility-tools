(function() {
  const currentUrl = window.location.href;
  // Regex to match fandom.com/XX/wiki where XX is any language code
  const fandomRegex = /fandom\.com\/([a-z]{2,3})\/wiki/i;
  
  if (fandomRegex.test(currentUrl)) {
    const newUrl = currentUrl.replace(fandomRegex, 'fandom.com/wiki');
    console.log(`Redirecting from ${currentUrl} to ${newUrl}`);
    window.location.replace(newUrl);
  }
})();

(function() {
  const currentUrl = window.location.href;
  // Improved regex to match subdomains and any language code in the path
  // Matches: https://anything.fandom.com/XX/wiki/...
  const fandomRegex = /^(https?:\/\/[^/]+\.fandom\.com)\/([a-z]{2,3})\/wiki\/(.*)$/i;
  
  const match = currentUrl.match(fandomRegex);
  if (match) {
    const baseUrl = match[1];
    const pagePath = match[3];
    const newUrl = `${baseUrl}/wiki/${pagePath}`;
    
    console.log(`[Fandom English Force] Redirecting from ${currentUrl} to ${newUrl}`);
    window.location.replace(newUrl);
  }
})();

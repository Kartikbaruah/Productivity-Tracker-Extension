chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      const url = new URL(tab.url);
      const hostname = url.hostname;
  
      chrome.storage.local.get([hostname], (result) => {
        const timeSpent = result[hostname] || 0;
        const startTime = Date.now();
  
        const intervalId = setInterval(() => {
          const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
          chrome.storage.local.set({ [hostname]: timeSpent + elapsedTime });
        }, 1000);
  
        chrome.tabs.onRemoved.addListener((closedTabId) => {
          if (closedTabId === tabId) clearInterval(intervalId);
        });
      });
    }
  });
  
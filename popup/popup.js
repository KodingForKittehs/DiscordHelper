document.getElementById('searchMessages').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'searchMessages' });
  });
});

document.getElementById('listServers').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'listServers' });
  });
});

// Listen for server list updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateServerList') {
    const serverListDiv = document.getElementById('serverList');
    serverListDiv.innerHTML = ''; // Clear existing content
    
    request.servers.forEach(server => {
      const serverItem = document.createElement('div');
      serverItem.className = 'server-item';
      
      if (server.icon) {
        const iconUrl = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
        serverItem.innerHTML = `
          <img src="${iconUrl}" class="server-icon" alt="${server.name}">
          <span>${server.name}</span>
        `;
      } else {
        serverItem.innerHTML = `<span>${server.name}</span>`;
      }
      
      serverListDiv.appendChild(serverItem);
    });
  }
}); 
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'searchMessages') {
    // TODO: Implement message search functionality
    console.log('Searching messages...');
  }
  
  if (request.action === 'listServers') {
    // Get the authorization token from Discord's local storage
    const token = getDiscordToken();
    
    if (!token) {
      console.error('Not logged into Discord');
      return;
    }

    // Fetch user's guilds (servers)
    fetch('https://discord.com/api/v9/users/@me/guilds', {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch servers');
      }
      return response.json();
    })
    .then(servers => {
      // Send the server list back to the popup
      chrome.runtime.sendMessage({
        action: 'updateServerList',
        servers: servers
      });
    })
    .catch(error => {
      console.error('Error fetching servers:', error);
    });
  }
});

// Helper function to get Discord token from local storage
function getDiscordToken() {
  // Discord stores the token in localStorage
  const token = localStorage.getItem('token')?.replace(/"/g, '') ||
                localStorage.getItem('discord_token');
  return token ? `Bearer ${token}` : null;
} 
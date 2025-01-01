const API_BASE_URL = '/api/users';

export const githubService = {
  async getUserProfile(username) {
    const response = await fetch(`${API_BASE_URL}/${username}`);
    console.log(response)
    if (!response.ok) throw new Error('User not found');
    return response.json();
  },

  async getRepositories(username) {
    const response = await fetch(`${API_BASE_URL}/${username}/repos`);
    if (!response.ok) throw new Error('Failed to fetch repositories');
    return response.json();
  },

  async getFollowers(username) {
    const response = await fetch(`${API_BASE_URL}/${username}/followers`);
    if (!response.ok) throw new Error('Failed to fetch followers');
    return response.json();
  },

  async saveProfile(username, profileData) {
    const response = await fetch(`${API_BASE_URL}/${username}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData)
    });
    if (!response.ok) throw new Error('Failed to save profile');
    return response.json();
  },

  async searchUsers(query) {
    const response = await fetch(`${API_BASE_URL}/search/users?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search users');
    return response.json();
  }
};
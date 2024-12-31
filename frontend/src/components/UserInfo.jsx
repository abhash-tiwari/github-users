import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { githubService } from '../services/api';

 const UserInfo = ({ setUserData, setRepositories, setFollowers }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [userData, repoData, followerData] = await Promise.all([
        githubService.getUserProfile(username),
        githubService.getRepositories(username),
        githubService.getFollowers(username)
      ]);

      setUserData(userData);
      setRepositories(repoData);
      setFollowers(followerData);

      await githubService.saveProfile(username, userData);

      navigate('/');
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Enter GitHub username"
        className="search-input"
      />
      <button 
        onClick={handleSearch} 
        disabled={loading}
        className="search-button"
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};


export default UserInfo;
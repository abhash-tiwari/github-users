import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = '/api/users';

const FollowerList = ({ 
  followers, 
  setUserData, 
  setRepositories, 
  setFollowers, 
  cachedUsers,
  setCachedUsers 
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${username}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      return response.json();
    } catch (error) {
      throw new Error('User data fetch failed');
    }
  };

  const fetchUserRepos = async (username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${username}/repos`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      return response.json();
    } catch (error) {
      throw new Error('Repository fetch failed');
    }
  };

  const fetchUserFollowers = async (username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${username}/followers`);
      if (!response.ok) throw new Error('Failed to fetch followers');
      return response.json();
    } catch (error) {
      throw new Error('Followers fetch failed');
    }
  };

  const handleFollowerClick = useCallback(async (username) => {
    setError(null);

    // Check if user data is already cached
    if (cachedUsers[username]) {
      const { userData, repos, userFollowers } = cachedUsers[username];
      setUserData(userData);
      setRepositories(repos);
      setFollowers(userFollowers);
      navigate('/');
      return;
    }

    setIsLoading(true);

    try {
      // Fetch all data in parallel
      const [userData, repos, userFollowers] = await Promise.all([
        fetchUserData(username),
        fetchUserRepos(username),
        fetchUserFollowers(username)
      ]);

      // Save to cache
      setCachedUsers(prevCache => ({
        ...prevCache,
        [username]: {
          userData,
          repos,
          userFollowers
        }
      }));

      // Update app state
      setUserData(userData);
      setRepositories(repos);
      setFollowers(userFollowers);

      // Save profile to backend
      try {
        await fetch(`${API_BASE_URL}/${username}/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
      } catch (err) {
        console.error('Failed to save profile:', err);
        // Don't throw error here as it's not critical
      }

      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to load user data. Please try again.');
      console.error('Error fetching follower data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setUserData, setRepositories, setFollowers, setCachedUsers, cachedUsers]);

  // Loading state for initial render
  if (isLoading && followers.length === 0) {
    return (
      <div className="followers-container">
        <div className="loading-message">Loading followers...</div>
      </div>
    );
  }

  // Empty state
  if (!followers || followers.length === 0) {
    return (
      <div className="followers-container">
        <div className="followers-header">
          <Link to="/" className="back-button">← Back to Search</Link>
          <h2>Followers</h2>
        </div>
        <p className="no-data-message">No followers found.</p>
      </div>
    );
  }

  // Error state
  if (error && !isLoading) {
    return (
      <div className="followers-container">
        <div className="followers-header">
          <Link to="/" className="back-button">← Back to Search</Link>
          <h2>Followers</h2>
        </div>
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="followers-container">
      <div className="followers-header">
        <Link to="/" className="back-button">← Back to Search</Link>
        <h2>Followers ({followers.length})</h2>
      </div>

      <div className="followers-grid">
        {followers.map((follower) => (
          <div 
            key={follower.id} 
            className={`follower-card ${isLoading ? 'disabled' : ''}`}
            onClick={() => !isLoading && handleFollowerClick(follower.login)}
          >
            <div className="follower-avatar-container">
              <img 
                src={follower.avatar_url} 
                alt={follower.login} 
                className="follower-avatar"
              />
              {cachedUsers[follower.login] && (
                <span className="cached-badge" title="Data cached">✓</span>
              )}
            </div>
            <div className="follower-info">
              <h3 className="follower-name">{follower.login}</h3>
              <a 
                href={follower.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="follower-link"
                onClick={(e) => e.stopPropagation()}
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default FollowerList;
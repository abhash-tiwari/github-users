import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar_url} alt={user.login} className="profile-avatar" />
        <div className="profile-info">
          <h2>{user.name || user.login}</h2>
          <p className="profile-bio">{user.bio}</p>
          <p className="profile-location">
            {user.location && <span>📍 {user.location}</span>}
          </p>
          {user.blog && (
            <a 
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              🔗 Website
            </a>
          )}
        </div>
      </div>
      <div className="profile-stats">
        <Link to={`/user/${user.login}/followers`} className="followers-link">
          👥 {user.followers} Followers
        </Link>
        <span>👁️ {user.following} Following</span>
        <span>📚 {user.public_repos} Repositories</span>
      </div>
    </div>
  );
};

export default UserProfile;
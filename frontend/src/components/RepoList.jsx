import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const RepoList = ({ repositories }) => {

    console.log(repositories)
  if (repositories.length === 0) {
    return <p className="no-data">No repositories available.</p>;
  }

  return (
    <div className="repo-list">
      <h2 className="repo-list-title">Repositories</h2>
      <div className="repo-grid">
        {repositories.map((repo) => (
          <Link 
            to={`/repo/${repo.owner.login}/${repo.name}`}
            key={repo.id}
            className="repo-item"
          >
            <div className="repo-icon">
                <div className="repo-avatar-fallback">
                  <img 
                    src={`https://via.placeholder.com/40/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${repo.name.charAt(0).toUpperCase()}`} 
                    alt={`${repo.name} fallback avatar`} 
                    className="repo-avatar"
                  />
                </div>
            </div>
            <div className="repo-content">
              <div className="repo-header">
                <h3 className="repo-name">{repo.name}</h3>
                {!repo.private && (
                  <svg className="verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className="repo-description">
                {repo.description || 'No description available'}
              </p>
              <div className="repo-stats">
                {repo.stargazers_count > 0 && (
                  <span className="stat-item">⭐ {repo.stargazers_count}</span>
                )}
                {repo.forks_count > 0 && (
                  <span className="stat-item">🔄 {repo.forks_count}</span>
                )}
                {repo.language && (
                  <span className="stat-item">{repo.language}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RepoList;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.css';

const RepoDetails = ({ repositories }) => {
  const { username, repoName } = useParams();
  const repo = repositories.find(r => r.name === repoName);
  
  if (!repo) {
    return (
      <div className="repo-details-container">
        <Link to="/" className="back-link">← Back</Link>
        <p className="repo-not-found">Repository not found.</p>
      </div>
    );
  }

  const defaultDescription = 'This repository contains valuable code and resources for the GitHub community. Explore it to learn, contribute, or use it in your own projects.';

  return (
    <div className="repo-details">
      <Link to="/" className="back-link">← Back</Link>
      
      <div className="repo-header">
        <div className="repo-left">
          <div className="repo-image-container">
            <img
              src={`https://via.placeholder.com/40/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${repo.name.charAt(0).toUpperCase()}`} 
              alt="Repo-Logo"
              className="repo-image"
            />
          </div>
          
          

          <div className="repo-verification">
            <div className="repo-verification-tag">
              <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verified by GitHub</span>
              <span>Github confirms that this repository <br /> meets the requirements for verification.</span>
            </div>
          </div>

          <div className="repo-tags">
            <span className="tag">{repo.language}</span>
          </div>
        </div>

        <div className="repo-right">
        <div className="repo-name-section">
            <h1 className="repo-name">{repo.name}</h1>
          </div>
          <p className="repo-description">
            {repo.description || defaultDescription}
          </p>
        <div className="">
          <span>Owner:</span>
          <span>{repo.owner.login}</span>
        </div>
        <div className="">
          <span>Stars:</span>
          <span>⭐ {repo.stargazers_count}</span>
        </div>
        <div className="">
          <span>Forks:</span>
          <span>🔄 {repo.forks_count}</span>
        </div>
        <div className="">
          <span>Language:</span>
          <span>{repo.language || 'N/A'}</span>
        </div>
        <div className="">
          <span>Created:</span>
          <span>{new Date(repo.created_at).toLocaleDateString()}</span>
        </div>
        <div className="">
          <span>Last Updated:</span>
          <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="setup-btn"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;

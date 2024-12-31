import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.css'

const RepoDetails = ({ repositories }) => {
  const { username, repoName } = useParams();
  const repo = repositories.find(r => r.name === repoName);

  if (!repo) {
    return (
      <div className="repo-details">
        <Link to="/" className="back-button">← Back</Link>
        <p className="no-data">Repository not found.</p>
      </div>
    );
  }

  return (
    <div className="repo-details">
      <Link to="/" className="back-button">← Back</Link>
      <h2>{repo.name}</h2>
      <p className="repo-description">{repo.description}</p>
      
      <div className="repo-info">
        <div className="info-item">
          <span>Owner:</span>
          <span>{repo.owner.login}</span>
        </div>
        <div className="info-item">
          <span>Stars:</span>
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="info-item">
          <span>Forks:</span>
          <span>{repo.forks_count}</span>
        </div>
        <div className="info-item">
          <span>Language:</span>
          <span>{repo.language}</span>
        </div>
        <div className="info-item">
          <span>Created:</span>
          <span>{new Date(repo.created_at).toLocaleDateString()}</span>
        </div>
        <div className="info-item">
          <span>Last Updated:</span>
          <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="repo-links">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="repo-link"
        >
          View on GitHub
        </a>
        {repo.homepage && (
          <a 
            href={repo.homepage} 
            target="_blank" 
            rel="noopener noreferrer"
            className="repo-link"
          >
            Visit Homepage
          </a>
        )}
      </div>
    </div>
  );
};

export default RepoDetails;
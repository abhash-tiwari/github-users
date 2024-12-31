import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const RepoList = ({ repositories }) => {
  if (repositories.length === 0) {
    return <p className="no-data">No repositories available.</p>;
  }

  return (
    <div className="repo-list">
      <h2>Repositories</h2>
      <div className="repo-grid">
        {repositories.map((repo) => (
          <Link 
            to={`/repo/${repo.owner.login}/${repo.name}`} 
            key={repo.id}
            className="repo-card"
          >
            <h3>{repo.name}</h3>
            <p>{repo.description || 'No description available'}</p>
            <div className="repo-stats">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🔄 {repo.forks_count}</span>
              <span>{repo.language}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
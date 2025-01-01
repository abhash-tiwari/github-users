import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from './components/UserInfo';

const UserProfile = React.lazy(() => import('./components/UserProfile'));
const RepoList = React.lazy(() => import('./components/RepoList'));
const FollowerList = React.lazy(() => import('./components/FollowerList'));
const RepoDetails = React.lazy(() => import('./components/RepoDeatils'));

import './app.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [cachedUsers, setCachedUsers] = useState({});

  return (
    <Router>
      <div className="app-container">
        <UserInfo 
          setUserData={setUserData} 
          setRepositories={setRepositories} 
          setFollowers={setFollowers}
        />
        
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <>
                <h1 className="main-title">GitHub Profile Search</h1>
                {userData && <UserProfile user={userData} />}
                {repositories.length > 0 && <RepoList repositories={repositories} />}
              </>
            } />
            
            <Route path="/repo/:username/:repoName" element={<RepoDetails repositories={repositories} />} />
            
            <Route path="/user/:username/followers" element={
              <FollowerList 
                followers={followers} 
                setUserData={setUserData}
                setRepositories={setRepositories}
                setFollowers={setFollowers}
                cachedUsers={cachedUsers}
                setCachedUsers={setCachedUsers}
              />
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import RepoList from './components/RepoList';
import FollowerList from './components/FollowerList';
import UserProfile from './components/UserProfile';
import RepoDetails from './components/RepoDeatils';
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
        
        <Routes>
          <Route path="/" element={
            <>
              <h1 className="main-title">GitHub Profile Search</h1>
              {userData && <UserProfile user={userData} />}
              {repositories.length > 0 && <RepoList repositories={repositories} />}
            </>
          } />
          
          <Route path="/repo/:username/:repoName" element={
            <RepoDetails repositories={repositories} />
          } />
          
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
      </div>
    </Router>
  );
};
export default App;
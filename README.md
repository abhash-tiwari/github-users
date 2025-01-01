GitHub User Management API
This project provides an API to manage GitHub user data, identify mutual followers, and store relevant details in a database. The backend exposes several endpoints for interacting with GitHub data, and the frontend retrieves and displays this information.

Folder Structure
├── backend
│   ├── controllers
│   ├── db
│   │   └── config.js
│   ├── models
│   ├── routes
│   └── server.js
└── frontend
    ├── src
    │   ├── components
    │   ├── services
    │   │   └── api.js
    │   └── App.jsx
    └── vite.config.js
Backend API
The backend serves as an API that fetches and manages GitHub user data. The routes are structured under the /api/users prefix.

API Endpoints
Get User Profile

Route: GET /api/users/:username
Description: Fetches the GitHub profile data for the provided username.
Save User Profile

Route: POST /api/users/:username/save
Description: Saves GitHub profile data in the database. If the user's data already exists, it won't call the GitHub API again.
Update User Profile

Route: PUT /api/users/:username
Description: Updates the fields such as location, blog, and bio for a given user in the database.
Delete User Profile (Soft Delete)

Route: DELETE /api/users/:username
Description: Soft deletes the user's data based on the provided username.
Fetch Repositories

Route: GET /api/users/:username/repos
Description: Fetches the list of repositories for the provided username.
Fetch Followers

Route: GET /api/users/:username/followers
Description: Fetches the list of followers for the provided username.
Find Mutual Friends

Route: GET /api/users/:username/mutual-friends
Description: Finds all the users where the provided username and the other user mutually follow each other, and returns them as friends.
Search Users

Route: GET /api/users/search/users
Description: Allows searching users in the database by username, location, etc.
Get Sorted Users

Route: GET /api/users/sorted/users
Description: Returns a list of all users from the database, sorted by fields such as public_repos, followers, etc.
Installation

Clone the repository:

git clone https://github.com/abhash-tiwari/github-users
cd backend

Install dependencies for the backend:

cd backend
npm install
Configure the database (e.g., MySQL or PostgreSQL) and set up the database connection in the .env file or db.js.

Run the server:
npm start

Database Schema
Users Table: Stores user profile data such as username, bio, location, followers_count, following_count, etc.
Friends Table: Stores relationships between users who mutually follow each other.


Frontend
The frontend allows users to search for GitHub profiles, view repositories, and display mutual followers. It interacts with the backend API to fetch and display data.

Features
Search GitHub Username

Allows users to input a GitHub username and view a list of repositories associated with that user.
Repository Details

Clicking a repository displays detailed information about it.
Followers Page

Displays the list of followers for the given user.
Navigation

Navigation between pages (repository list, follower list, etc.) without making unnecessary repeated API calls.

Folder Structure
└── frontend
    ├── src
    │   ├── components
    │   ├── services
    │   │   └── api.js
    │   └── App.jsx
    └── vite.config.js
Installation

Clone the repository:
git clone https://github.com/abhash-tiwari/github-users
cd frontend

Install dependencies:
npm install

Start the development server:
npm start

Folder Details
components: Contains the React components used to build the user interface.
services/api.js: Contains utility functions to interact with the backend API.
App.jsx: The main component that handles routing and user interactions.

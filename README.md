Github User Management
This project provides an API to manage GitHub user data, identify mutual followers, and store relevant details in a database. The backend exposes several endpoints for interacting with GitHub data, and the frontend retrieves and displays this information.

API Endpoints
Get User Profile
  GET /api/users/:username
Parameter	Type	Description
github_token	string	Fetches the GitHub profile data for the provided username.
Fetch Repositories
  GET /api/users/:username/repos
Parameter	Type	Description
github_token	string	Fetches the list of repositories for the provided username
Fetch Followers
  GET /api/users/:username/followers
Parameter	Type	Description
github_token	string	Finds all the users where the provided username and the other user mutually follow each other, and returns them as friends.
Search Users
  GET /api/users/search/users
Parameter	Type	Description
github_token	string	Allows searching users in the database by username, location, etc.
Save User
  POST /api/users/:username/save
Parameter	Type	Description
id	string	Saves GitHub profile data in the database. If the user's data already exists, it won't call the GitHub API again.
Sorted User
  GET /api/users/sorted/users
Parameter	Type	Description
github_token	string	Returns a list of all users from the database, sorted by fields.
Update User
  PUT /api/users/:username
Parameter	Type	Description
id	string	Updates the fields such as location, blog, and bio for a given user in the database.
Delete User Profile
  DELETE /api/users/:username
Parameter	Type	Description
id	string	Soft deletes the user's data based on the provided username.
Installation
Clone the Repository git clone Documentation
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

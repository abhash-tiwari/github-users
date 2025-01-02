# Github User Management

This project provides an API to manage GitHub user data, identify mutual followers, and store relevant details in a database. The backend exposes several endpoints for interacting with GitHub data, and the frontend retrieves and displays this information.



## Installation

git clone https://github.com/abhash-tiwari/github-users

```bash
  cd backend
  npm install
```
Configure the database (e.g., MySQL or PostgreSQL) and set up the database connection in the .env file or config.js.

Run the server:

```bash
  npm start
```
Database Schema
Users Table: Stores user profile data such as username, bio, location, followers_count, following_count, etc.
Friends Table: Stores relationships between users who mutually follow each other.
    ## API Endpoints

#### Get User Profile

```http
  GET /api/users/:username
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `github_token` | `string` | Fetches the GitHub profile data for the provided username. |

#### Fetch Repositories

```http
  GET /api/users/:username/repos
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `github_token` | `string` | Fetches the list of repositories for the provided username |

#### Fetch Followers

```http
  GET /api/users/:username/followers
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `github_token` | `string` | Finds all the users where the provided username and the other user mutually follow each other, and returns them as friends. |

#### Search Users

```http
  GET /api/users/search/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `github_token` | `string` | Allows searching users in the database by username, location, etc. |

#### Save User

```http
  POST /api/users/:username/save
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Saves GitHub profile data in the database. If the user's data already exists, it won't call the GitHub API again. |

#### Sorted User

```http
  GET /api/users/sorted/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `github_token`      | `string` | Returns a list of all users from the database, sorted by fields. |

#### Update User

```http
  PUT /api/users/:username
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Updates the fields such as location, blog, and bio for a given user in the database. |

#### Delete User Profile

```http
  DELETE /api/users/:username
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Soft deletes the user's data based on the provided username. |

## Environment Variables Backend

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`GITHUB_TOKEN`


## Frontend

### Features
- Search GitHub Username: Allows users to input a GitHub username and view a list of repositories associated with that user.
- Repository Details: Clicking a repository displays detailed information about it.
- Followers Page: Displays the list of followers for the given user.
- Navigation: Navigation between pages (repository list, follower list, etc.) without making unnecessary repeated API calls.


### Frontend Installation

Install Dependencies

```bash
  npm install
```
Start the development server

```bash
  npm run dev
```


### Folder Details

#### Components
 Contains the React components used to build the user interface.
#### services/api.js
Contains utility functions to interact with the backend API.
####App.jsx
The main component.




## Author

- [Abhash Tiwari](https://www.github.com/abhash-tiwari)



```


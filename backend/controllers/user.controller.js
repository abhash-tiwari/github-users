import User from "../models/user.models.js";
import axios from "axios";

export const fetchFollowers = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/followers`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });
    const followers = response.data;
    res.status(200).json(followers);
  } catch (error) {
    console.log(`Error in fetching followers for ${username}`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchRepositories = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });
    const repositories = response.data;
    res.status(200).json(repositories);
  } catch (error) {
    console.log(`Error in fetching repositories for ${username}`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });
    const userProfile = response.data;
    res.status(200).json(userProfile);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access to GitHub API. Check your token.");
      res.status(401).json({ message: "Unauthorized" });
    } else if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "User not found" });
    } else {
      console.error("Error in Getting getUserProfile:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const saveProfile = async (req, res) => {
  const { username } = req.params;
  let user = await User.findOne({ username });

  if (!user) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      });
      const gitHub = response.data;

      user = new User({
        username: gitHub.login,
        avatar_url: gitHub.avatar_url,
        repos_url: gitHub.repos_url,
        url: gitHub.url,
        html_url: gitHub.html_url,
        followers_url: gitHub.followers_url,
        type: gitHub.type,
        name: gitHub.name,
        location: gitHub.location,
        bio: gitHub.bio,
        blog: gitHub.blog,
        public_gists: gitHub.public_gists,
        public_repos: gitHub.public_repos,
        followers: gitHub.followers,
        following: gitHub.following,
      });

      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.log("Error in Saving userProfile", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(200).json(user);
  }
};
export const createUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await saveProfile(username);
    res.status(201).json(user);
  } catch (error) {
    console.log("Error in Creating user", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { username }, 
      { soft_deleted: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in Deleting userProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;
  try {
    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    console.log("Error in Updating userProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const findMutualFriends = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const followersData = await axios.get(
      `https://api.github.com/users/${username}/followers`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }
      }
    );
    const followingData = await axios.get(
      `https://api.github.com/users/${username}/following`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }
      }
    );

    console.log('Followers:', followersData.data);
    console.log('Following:', followingData.data);

    const followers = followersData.data.map((user) => user.login);
    const following = followingData.data.map((user) => user.login);

    const mutualFriends = followers.filter((follower) =>
      following.includes(follower)
    );

    console.log('Mutual Friends:', mutualFriends);

    res.json(mutualFriends);
  } catch (error) {
    console.log("Error in finding mutual userProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const searchUsers = async (req, res) => {
  const { username, location } = req.query;
  try {
    const query = { soft_deleted: false };
    
    if (username) {
      query.username = { $regex: username, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    console.error("Error in searchUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSortedUsers = async (req, res) => {
  const { sortBy = 'created_at' } = req.query;
  const allowedSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
  
  if (!allowedSortFields.includes(sortBy)) {
    return res.status(400).json({ message: "Invalid sort field" });
  }

  try {
    const users = await User.find({ soft_deleted: false })
      .sort({ [sortBy]: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error in getSortedUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    avatar_url: String,
    repos_url: String,
    url: String,
    html_url: String,
    followers_url: String,
    type: String,
    name: String,
    location: {
      type: String,
      index: true,
    },
    bio: String,
    public_repos: Number,
    public_gists: Number,
    followers: {
      type: Number,
      required: true,
    },
    following: {
      type: Number,
      required: true,
    },
    blog: String,
    soft_deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    friends: [String],
    repositories: [{
      id: Number,
      name: String,
      description: String,
      html_url: String,
      created_at: Date,
      updated_at: Date,
      stargazers_count: Number,
      language: String,
    }],
    followersList: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
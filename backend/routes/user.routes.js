import express from "express";
import {
  findMutualFriends,
  getUserProfile,
  saveProfile,
  fetchRepositories,
  fetchFollowers,
  deleteUser,
  updateUser,
  searchUsers,
  getSortedUsers
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:username", getUserProfile);
router.post("/:username/save", saveProfile);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);

router.get("/:username/repos", fetchRepositories);
router.get("/:username/followers", fetchFollowers);
router.get("/:username/mutual-friends", findMutualFriends);

router.get("/search/users", searchUsers);
router.get("/sorted/users", getSortedUsers);

export default router;
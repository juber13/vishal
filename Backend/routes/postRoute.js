import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPost,
  getLikedPost,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/likes/:id", protectRoute, getLikedPost);
router.get("/following", protectRoute, getFollowingPost);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;

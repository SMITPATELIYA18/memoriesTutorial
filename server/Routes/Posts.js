import Express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../Controllers/Posts.js";

import auth from "../Middleware/Auth.js";
const router = Express.Router();

//localhost:5000/posts
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost); 

export default router;

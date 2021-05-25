import Express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../Controllers/Posts.js";

const router = Express.Router();

//localhost:5000/posts
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost",likePost);

export default router;

import Mongoose from "mongoose";
import postMessage from "../Models/PostMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
    // postMessages.forEach((post) => console.log(post._id));
  } catch (error) {
    res.status(404).json({ Message: error.Message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ Message: error.Message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  // console.log(`${post} ${_id}`);
  // console.log(post);
  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Posts with that Id");
  }

  const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Posts with that Id");
  }
  await postMessage.findByIdAndRemove(_id);
  res.json({ message: "Post deleted successfully!!" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Posts with that Id");
  }
  const post = await postMessage.findById(_id);
  const updatedPost = await postMessage.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};

import Mongoose from "mongoose";
import postMessage from "../Models/PostMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await postMessage.countDocuments({});
    const posts = await postMessage
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    const number = Math.ceil(total / LIMIT);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: number,
    });
    // postMessages.forEach((post) => console.log(post._id));
  } catch (error) {
    res.status(404).json({ Message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    const posts = await postMessage
      .find({
        tags: { $in: post.tags },
      })
      .limit(4);
    res.status(200).json({ post, posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await postMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error, title: title });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(409).json({ Message: error.message });
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

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Posts with that Id");
  }
  const post = await postMessage.findById(_id);

  const index = post.likes.findIndex((_id) => _id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((_id) => _id !== String(req.userId));
  }

  const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

const { validationResult } = require("express-validator");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Post']
  const result = await mongodb
    .getDatabse()
    .db("project1")
    .collection("posts")
    .find();
  result
    .toArray()
    .then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json({ message: err }));
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Post']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const postId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabse()
    .db("project1")
    .collection("posts")
    .find({ _id: postId });
  result
    .toArray()
    .then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    })
    .catch((err) => res.status(400).json({ message: err }));
};

const createPost = async (req, res) => {
  //#swagger.tags = ['Post']

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = new ObjectId(req.params.userId);
  const post = {
    userId: userId,
    text: req.body.text,
    createdAt: req.body.createdAt,
    likes: req.body.likes,
  };

  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("posts")
    .insertOne(post);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const updatePost = async (req, res) => {
  //#swagger.tags = ['Post']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const postId = new ObjectId(req.params.id);
  const userId = new ObjectId(req.params.userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const post = {
    userId: userId,
    text: req.body.text,
    createdAt: req.body.createdAt,
    likes: req.body.likes,
  };

  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("posts")
    .replaceOne({ _id: postId }, post);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const deletePost = async (req, res) => {
  //#swagger.tags = ['Post']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const postId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("posts")
    .deleteOne({ _id: postId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createPost,
  deletePost,
  updatePost,
};

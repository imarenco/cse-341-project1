const { validationResult } = require("express-validator");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Comment']
  const result = await mongodb
    .getDatabse()
    .db("project1")
    .collection("comments")
    .find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Comment']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabse()
    .db("project1")
    .collection("comments")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createComment = async (req, res) => {
  //#swagger.tags = ['Comment']

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = new ObjectId(req.params.userId);
  const postId = new ObjectId(req.params.postId);
  const comment = {
    userId: userId,
    postId: postId,
    text: req.body.text,
  };

  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("comments")
    .insertOne(comment);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const updateComment = async (req, res) => {
  //#swagger.tags = ['Comment']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = new ObjectId(req.params.userId);
  const postId = new ObjectId(req.params.postId);
  const comment = {
    userId: userId,
    postId: postId,
    text: req.body.text,
  };

  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("comments")
    .replaceOne({ _id: userId }, comment);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const deleteComment = async (req, res) => {
  //#swagger.tags = ['Comment']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("comments")
    .deleteOne({ _id: userId });
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
  createComment,
  deleteComment,
  updateComment,
};

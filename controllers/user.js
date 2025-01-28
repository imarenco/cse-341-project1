const { validationResult } = require("express-validator");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['User']
  const result = await mongodb
    .getDatabse()
    .db("project1")
    .collection("user")
    .find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['User']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const postId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabse()
    .db("project1")
    .collection("user")
    .find({ _id: postId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createUser = async (req, res) => {
  //#swagger.tags = ['User']

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    image: req.body.image,
    email: req.body.email,
    birthday: req.body.birthday,
    bio: req.body.bio,
  };

  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("user")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags = ['User']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const postId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    image: req.body.image,
    email: req.body.email,
    birthday: req.body.birthday,
    bio: req.body.bio,
  };

  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("user")
    .replaceOne({ _id: postId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the user.");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['User']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id");
  }

  const postId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabse()
    .db("project1")
    .collection("user")
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
  createUser,
  deleteUser,
  updateUser,
};

const { check } = require("express-validator");
const { ObjectId } = require("mongodb");

const isValidId =  async (id) => {
  if(!ObjectId.isValid(id)) {
    throw new Error('Invalid Id');
  }
}

const getUserValidations = (req, res, next) => {
  return [
    check("firstName").isLength({ min: 2 }),
    check("lastName").isLength({ min: 2 }),
    check("password").isLength({ min: 2 }),
    check("image").isLength({ min: 10 }),
    check("email").isEmail(),
    check("birthday").isISO8601().toDate(),
    check("bio").isLength({ min: 1 }),
  ];
};

const getPostValidations = (req, res, next) => {
  return [
    check("userId").custom(isValidId),
    check("text").isLength({ min: 10 }),
    check("createdAt").isISO8601().toDate(),
    check("likes").isNumeric(),
  ];
};

const getCommentValidations = (req, res, next) => {
  return [
    check("userId").custom(isValidId),
    check("postId").custom(isValidId),
    check("text").isLength({ min: 5 }),
  ];
};

module.exports = {
  getUserValidations,
  getPostValidations,
  getCommentValidations,
};

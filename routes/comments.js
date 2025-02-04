const express = require("express");
const router = express.Router();
const { getCommentValidations } = require("../middleware/validate");
const commentController = require("../controllers/comment");
const Auth = require("../helpers/auth");

router.get("/", commentController.getAll);

router.get(
  "/:id",

  commentController.getSingle
);

router.post(
  "/",
  Auth.login,
  getCommentValidations(),
  commentController.createComment
);

router.put(
  "/:id",
  Auth.login,
  getCommentValidations(),
  commentController.updateComment
);

router.delete("/:id", Auth.login, commentController.deleteComment);

module.exports = router;

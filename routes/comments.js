const express = require("express");
const router = express.Router();
const { getCommentValidations } = require("../middleware/validate");
const commentController = require("../controllers/comment");

router.get("/", commentController.getAll);

router.get(
  "/:id",

  commentController.getSingle
);

router.post("/", getCommentValidations(), commentController.createComment);

router.put("/:id", getCommentValidations(), commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;

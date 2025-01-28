const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");
const { getPostValidations } = require("../middleware/validate");

router.get("/", postController.getAll);

router.get("/:id", postController.getSingle);

router.post("/", getPostValidations(), postController.createPost);

router.put("/:id", getPostValidations(), postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;

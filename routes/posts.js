const express = require("express");
const router = express.Router();
const Auth = require("../helpers/auth");
const postController = require("../controllers/post");
const { getPostValidations } = require("../middleware/validate");

router.get("/", postController.getAll);

router.get("/:id", postController.getSingle);

router.post("/", Auth.login, getPostValidations(), postController.createPost);

router.put("/:id", Auth.login, getPostValidations(), postController.updatePost);

router.delete("/:id", Auth.login, postController.deletePost);

module.exports = router;

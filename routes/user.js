const express = require("express");
const router = express.Router();

const commentController = require("../controllers/user");
const Auth = require("../helpers/auth");
const { getUserValidations } = require("../middleware/validate");

router.get("/", commentController.getAll);

router.get("/:id",  Auth.login, commentController.getSingle);

router.post("/", getUserValidations(), commentController.createUser);

router.post("/login", getUserValidations(), commentController.loginUser);

router.put(
  "/:id",
  Auth.login,
  getUserValidations(),
  commentController.updateUser
);

router.delete("/:id", Auth.login, commentController.deleteUser);

module.exports = router;

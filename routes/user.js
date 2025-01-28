const express = require("express");
const router = express.Router();

const commentController = require("../controllers/user");
const { getUserValidations } = require("../middleware/validate");

router.get("/", commentController.getAll);

router.get("/:id", commentController.getSingle);

router.post("/", getUserValidations(), commentController.createUser);

router.put("/:id", getUserValidations(), commentController.updateUser);

router.delete("/:id", commentController.deleteUser);

module.exports = router;

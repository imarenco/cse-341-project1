const express = require("express");
const router = express.Router();

const userController = require("../controllers/contacts");

router.get("/", userController.getAll);

router.get("/:id", userController.getSingle);

router.post("/", userController.createContact);

router.put("/:id", userController.updateContact);

router.delete("/:id", userController.deleteContact);

module.exports = router;

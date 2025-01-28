const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/users", require("./user"));

module.exports = router;

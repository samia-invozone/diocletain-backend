const router = require("express").Router();

router.use("/api", require("./admin.routes"));

module.exports = router;

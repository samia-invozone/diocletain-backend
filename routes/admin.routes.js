const router = require("express").Router();
const controller = require("../controllers/admin.controllers");

router.get("/getUsers", controller.getAllUsers);
router.get("/getS3Data", controller.getDataFromS3);

module.exports = router;

const router = require("express").Router();
const controller = require("../controllers/admin.controllers");

router.get("/getUsers", controller.getAllUsers);
router.get("/getS3Data", controller.getDataFromS3);
router.get("/get/canvasProperties", controller.getCanvasProperties);
router.post("/add/canvasProperties", controller.addCanvasProperties);

module.exports = router;

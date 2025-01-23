const express = require("express");
const router = express.Router();

const { localFileUpload, imageUpload, vedioUpload, reduceImage } = require("../controller/fileupload_controller");
//api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/vedioUpload", vedioUpload);
router.post("/reduceImage", reduceImage);
module.exports = router;
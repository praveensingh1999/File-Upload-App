const express = require("express");
const router = express.Router();

const { localFileUpload, imageUpload } = require("../controller/fileupload_controller");
//api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
module.exports = router;
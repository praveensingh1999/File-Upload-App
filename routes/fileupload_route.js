const express = require("express");
const router = express.Router();

const { localFileUpload } = require("../controller/fileupload_controller");
//api route
router.post("/localFileUpload", localFileUpload, () => {
    console.log("inside router");
});

module.exports = router;
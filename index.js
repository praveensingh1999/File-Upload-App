//app create 
const express = require("express");
const app = express();


// port find karna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

//db se connect
const db = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const upload = require("./routes/fileupload_route");
app.use("/api/v1/upload", upload);

// activate server
app.listen(PORT, () => {
    console.log(`app running at port ${PORT}`);
})
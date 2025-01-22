const File = require("../models/filemodel");

//localfileUpload -> handler function

exports.localFileUpload = async (req, res) => {
    try {
        console.log("inside controller body");
        //fetch file from request
        const file = req.files.file; // file name could be anythings
        console.log("file ->", file);

        //create path where  file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path->", path);

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success: true,
            message: `Local File Uploaded Successfully`,
        });
    }
    catch (error) {
        console.log(error);
        console.log("not able to upload file on the server");
    }
}
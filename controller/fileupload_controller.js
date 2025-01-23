const File = require("../models/filemodel");
const cloudinary = require("cloudinary").v2;
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

//image upload handler
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToClodinary(file, folder) {
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        //fetch data from req

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //fetch file from the request 
        const file = req.files.file;
        console.log(file);

        //validation 
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: `File format not supported`,
            })
        }

        // if file formate is supported then 
        const response = await uploadFileToClodinary(file, "EdTech"); // edtech is folder name where we create  on cloundinary
        console.log(response);

        //save data in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,

        });
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'image uploaded successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: `Something went wrong67`,
        });

    }
}
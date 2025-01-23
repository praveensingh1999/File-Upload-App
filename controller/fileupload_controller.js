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

async function uploadFileToClodinary(file, folder, quality) {
    const options = { folder };
    console.log("temp file path", file.tempFilePath);

    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        //fetch data from req

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //fetch file from the request 
        const file = req.files.imageFile;
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

// vedio upload handler
exports.vedioUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        //fetch file from request
        const file = req.files.vedioFile;
        console.log(file);

        //supported type 
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //validation

        // if formate of vedio file is not more than 5 mb
        if (file.size >= 5000000) {
            return res.status(400).json({
                success: false,
                message: `File size is exceeded 5MB`,
            })
        }

        // if formate of vedio file is not mp4 or mov 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: `File format not supported`,
            })
        }

        // if file formate is supported then 
        console.log("before the upload file");
        const response = await uploadFileToClodinary(file, "EdTech"); // edtech is folder name where we create  on cloundinary
        console.log(response);

        //save data in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,

        });
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'vedio uploaded successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong67',
        });


    }
}

// reduce image handler
exports.reduceImage = async (req, res) => {
    try {
        //fetch data from req

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //fetch file from the request 
        const file = req.files.imageFile;
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
        //90 is quality and we can also do the same to reduce file size using height attribute
        const response = await uploadFileToClodinary(file, "EdTech", 30); // edtech is folder name where we create  on cloundinary
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
            message: 'image reduce successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: `Something went wrong`,
        });

    }
}
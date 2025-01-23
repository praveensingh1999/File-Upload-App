const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    try {
        console.log("cloudinary body");
        cloudinary.config({

            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })
    } catch (error) {
        console.log("error kya hai." + error);

    }
}
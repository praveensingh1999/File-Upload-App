const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: ProcessingInstruction.env.CLOUD_NAME,
            api_key: ProcessingInstruction.env.API_KEY,
            api_secret: ProcessingInstruction.env.API_SECRET,
        })
    } catch (error) {

    }
}
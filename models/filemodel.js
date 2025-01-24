const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv");


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,

    },
    tags: {
        type: String,

    },
    email: {
        type: String,
    }
});

//post middleware for email services

fileSchema.post("save", async function (doc) {
    try {
        console.log("doc data", doc);


        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from: `Edtech - by Praveen`,
            to: doc.email,
            subject: "new file uploaded on cloudinary",
            html: `<h2> Hello jee</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}"> ${doc.imageUrl}</a></p>)`
        })
        console.log("info", info);
    }
    catch (error) {
        console.log(error);

    }

})



const File = mongoose.model("File", fileSchema);
module.exports = File;
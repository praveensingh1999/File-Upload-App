
const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(console.log("Db conncetion successfully"))
        .catch((error) => {
            console.log("Db conncetion issue");

            process.exit(1);
        });
};
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMongo;
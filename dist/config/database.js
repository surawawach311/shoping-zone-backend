"use strict";
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
exports.connect = () => {
    //connectin to the database
    mongoose.set("strictQuery", false);
    mongoose
        .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log("Successfully connected to database");
    })
        .catch((error) => {
        console.log("Error connecting to database");
        console.error(error);
        process.exit(1);
    });
};

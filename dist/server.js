"use strict";
const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./config/database").connect();
const authApi = require("./apis/authApi");
// dotenv.config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const app = express();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const corsOptions = {
    origin: "http://shopping-zone-frontend.s3-website-ap-southeast-1.amazonaws.com",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authApi);
module.exports = app;

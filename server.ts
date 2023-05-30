const express = require("express");

require("dotenv").config();
const cors = require("cors");
require("./config/database").connect();
const authApi = require("./apis/authApi");
const memberShipApi = require("./apis/membershipApi");
const bodyParser = require("body-parser");

// dotenv.config();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const app = express();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const corsOptions = {
  // origin: "http://127.0.0.1:5173",
  origin: "http://shopping-zone-frontend.s3-website-ap-southeast-1.amazonaws.com",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authApi);
app.use("/api/membership", memberShipApi);

module.exports = app;

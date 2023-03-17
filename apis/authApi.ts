import express from "express";
const auth = require("../middleware/auth");
const router = express.Router();

const {
  registerController,
  loginController,
  welcomeController,
} = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/welcome", welcomeController);

module.exports = router;

import express from "express";
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const { registerController, loginController, welcomeController } = require("../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/welcome", [auth, upload.single("image")], welcomeController);

module.exports = router;

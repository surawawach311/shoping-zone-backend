"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth = require("../middleware/auth");
const router = express_1.default.Router();
const { registerController, loginController, welcomeController, } = require("../controllers/authController");
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/welcome", welcomeController);
module.exports = router;

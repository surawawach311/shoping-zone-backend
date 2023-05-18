import express from "express";
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const auth = require("../middleware/auth");
const router = express.Router();

const { getMemberShip, createMemberShip, uploadSlip } = require("../controllers/membershipController");

router.get("/membership", auth, getMemberShip);
router.post("/membership", auth, createMemberShip);
router.post("/upload", [auth, upload.single("image")], uploadSlip);

module.exports = router;

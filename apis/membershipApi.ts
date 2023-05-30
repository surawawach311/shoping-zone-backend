import express from "express";
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const auth = require("../middleware/auth");
const router = express.Router();

const { getMemberShip, getAllMemberShip, uploadSlip, approvePremium } = require("../controllers/membershipController");

router.get("/membership", auth, getMemberShip);
router.get("/allMembership", auth, getAllMemberShip);
router.post("/upload", [auth, upload.single("image")], uploadSlip);
router.post("/approvePremium", auth, approvePremium);

module.exports = router;

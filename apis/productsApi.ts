import express from "express";
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const { getProductsRegisterByTelNo, registerProduct } = require("../controllers/productsController");

router.get("/products", getProductsRegisterByTelNo);
router.post("/registerProduct", [auth, upload.single("image")], registerProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.registerProduct);

module.exports = router;

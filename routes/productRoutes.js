const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require('../middlewares/authMiddleware');

router.delete("/:id", authMiddleware, productController.deletarProduto);

module.exports = router;

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/", productController.registerProduct);

router.get('/', authMiddleware, productController.listProducts);

router.put('/product/:id', authMiddleware, productController.updateProduct);

router.get('/product/:id', authMiddleware, productController.listProduct);

module.exports = router;

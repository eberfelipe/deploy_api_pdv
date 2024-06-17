const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/:id", clientController.detailClient);

module.exports = router;

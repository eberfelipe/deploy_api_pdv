const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const clientMiddleware = require('../middlewares/clientMiddleware');
const clientController = require('../controllers/clientController');

router.post('/', authMiddleware, clientMiddleware.validateNewClient, clientController.registerClient);


module.exports = router;
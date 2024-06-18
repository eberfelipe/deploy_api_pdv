const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const {
  verifyId,
  verifyClientIdExists,
  verifyName,
  verifyEmail,
  verifyCpf,
  verifyCpfExistsUpdate,
  verifyEmailExistsUpdateClients,
  validateNewClient
} = require("../middlewares/clientMiddleware");
const authMiddleware = require('../middlewares/authMiddleware');

router.put(
  '/:id',
  authMiddleware,
  verifyId,
  verifyClientIdExists,
  verifyName,
  verifyEmail,
  verifyCpf,
  verifyCpfExistsUpdate,
  verifyEmailExistsUpdateClients,
  clientController.clientUpdate
);

router.post(
  '/',
  authMiddleware,
  validateNewClient,
  clientController.registerClient
);

module.exports = router;
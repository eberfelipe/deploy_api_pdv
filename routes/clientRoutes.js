const express = require("express");
const router = express.Router();
const clientUpdate = require("../controllers/clientController");
const {
  verifyId,
  verifyClientIdExists,
  verifyName,
  verifyEmail,
  verifyCpf,
  verifyCpfExistsUpdate,
  verifyEmailExistsUpdateClients
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
  clientUpdate
);

module.exports = router;

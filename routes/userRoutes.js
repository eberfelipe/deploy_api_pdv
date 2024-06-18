const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.registrarUsuario);
router.post('/login', userController.logarUsuario);
router.get('/profile', authMiddleware, userController.obterPerfilUsuario);
router.put('/', authMiddleware, userController.atualizarPerfilUsuario);

module.exports = router;

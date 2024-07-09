const express = require('express');
const router = express.Router();
const { listarCategorias } = require('../controladores/controladorCategorias');

router.get('/', listarCategorias);

module.exports = router;

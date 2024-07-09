const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
  const cabecalhoAutorizacao = req.headers['authorization'];
  const token = cabecalhoAutorizacao && cabecalhoAutorizacao.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de acesso ausente ou inválido.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Token inválido.' });
    }
    req.usuario = usuario;
    next();
  });
};

module.exports = autenticarToken;

const bcrypt = require("bcrypt");
const knex = require('../config/database'); // Caminho corrigido
const jwt = require("jsonwebtoken");

const registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Nome, email e senha são obrigatórios" });
    }

    try {
        const emailExistente = await knex("usuarios").where({ email }).first();

        if (emailExistente) {
            return res.status(400).json({ mensagem: "O email usado já existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const [idUsuario] = await knex("usuarios").insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning('id');

        return res.status(201).json({ id: idUsuario, mensagem: "Usuário cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor: " + error.message });
    }
};

const logarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const tokenAcesso = jwt.sign({ id: usuario.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return res.json({ tokenAcesso });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor: ' + error.message });
    }
};

const obterPerfilUsuario = async (req, res) => {
    return res.status(200).json(req.usuario);
}

const atualizarPerfilUsuario = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        await knex('usuarios').where({ id }).update({ nome, email, senha: senhaCriptografada });
        res.status(200).json({ mensagem: 'Perfil atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro interno do servidor: ' + error.message });
    }
}

module.exports = {
    registrarUsuario,
    logarUsuario,
    obterPerfilUsuario,
    atualizarPerfilUsuario
};
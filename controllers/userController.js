const bcrypt = require("bcrypt");
const db = require("../config/database");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });
    }

    try {
        const existingEmail = await db("usuarios").where({ email }).first();

        if (existingEmail) {
            return res.status(400).json({ message: "O email usado já existe" });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const [userId] = await db("usuarios").insert({
            nome,
            email,
            senha: hashedPassword
        }).returning('id');

        return res.status(201).json({ id: userId, message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error: " + error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await db('usuarios').where({ email }).first();

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return res.json({ accessToken });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

const getUserProfile = async (req, res) => {
    return res.status(200).json(req.user);
}

const updateUserProfile = async (req, res) => {
    const { id } = req.user;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        await db('usuarios').where({ id }).update({ nome, email, senha: hashedPassword });
        res.status(200).json({ message: 'Perfil atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};

const db = require('../config/database');

const validateNewClient = async (req, res, next) => {
    const { nome, email, cpf } = req.body;

    if (!nome || !email || !cpf) {
        return res.status(400).json({message:'Todos os campos devem ser preenchidos!'});
    }

    try {
        const client = await db('clientes')
        .where({email})
        .first();

        if (client) {
            return res.status(401).json('Email já cadastrado.')
        }

        const clientCpf = await db('clientes')
            .where({cpf})
            .first();
        
        if (clientCpf) {
            return res.status(401).json('Cpf já cadastrado.')
        }

        next();
    } catch (error) {
        return res.status(401).json(error.message);
    }
    
}

module.exports = {
    validateNewClient
}
const knex = require('../config/database');

const clientUpdate = async (req, res) => {
    const { id } = req.params;

    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await knex("clientes")
            .where({ id })
            .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });

        return res.status(201).json({ mensagem: "Cliente atualizado com sucesso." });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    };
};

const registerClient = async (req, res) => {
    const { nome, 
            email, 
            cpf, 
            cep, 
            rua, 
            numero, 
            bairro, 
            cidade, 
            estado
        } = req.body;

    try {
        await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado

        });

        return res.status(201).json('Cliente cadastrado com sucesso!');  
    } catch (error) {
        return res.status(500).json(error.message);  
    }
}

module.exports = {
    clientUpdate,
    registerClient
}
const knex = require('../config/database');

const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await knex("clientes")
            .where({ id })
            .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });

        return res.status(200).json({ mensagem: "Cliente atualizado com sucesso." });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const obterDetalhesCliente = async (req, res) => {
    const idCliente = req.params.id;
    
    try {
        const cliente = await knex("clientes")
            .select("*")
            .where({ id: idCliente })
            .first();
        if (!cliente) {
            return res.status(404).json({ mensagem: "Cliente não encontrado" });
        }
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

const registrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

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

        return res.status(201).json({ mensagem: 'Cliente registrado com sucesso!' });  
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });  
    }
};

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes').select('*');
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao listar clientes' });
    }
};

module.exports = {
    atualizarCliente,
    obterDetalhesCliente,
    registrarCliente,
    listarClientes
};
const db = require("../config/database");

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
        await db('clientes').insert({
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
    registerClient
}
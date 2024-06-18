const knex = require("../config/database");

const detailClient = async (req, res) => {
  const clientId = req.params.id;
  console.log(clientId);
  try {
    const client = await knex("clientes")
      .select("*")
      .where({ id: clientId })
      .first();
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    return res.status(200).json(client);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
  detailClient,
  registerClient
}
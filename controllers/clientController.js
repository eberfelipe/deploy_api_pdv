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

module.exports = {
  detailClient,
};

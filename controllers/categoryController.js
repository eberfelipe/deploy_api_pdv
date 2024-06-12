const knex = require('../config/database');

const listCategories = async (req, res) => {
  try {
    const categories = await knex.select('*').from('categorias');
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  listCategories
};

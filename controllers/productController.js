const knex = require('../config/database');

const updateProduct = async (req, res) => {
    const { id } = req.user;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const product = await knex('produtos').where({ id }).first();

    if (!product) {
        return res.status(404).send('Produto não encontrado');
    }

    try {
        await knex('produtos')
            .where({ id })
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            });

        res.send('Produto editado com sucesso')
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const listProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await knex('produtos').where({ id, user_id: userId }).first();
        if (!product) {
            return res.status(404).send('Produto não encontrado');
        }
        res.json(product);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    updateProduct,
    listProduct
};

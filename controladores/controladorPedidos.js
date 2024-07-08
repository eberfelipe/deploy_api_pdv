const knex = require('../config/database');

const cadastrarPedido = async (req, res) => {
    const camposObrigatorios = ['cliente_id', 'pedido_produtos', 'produto_id', 'quantidade_produto'];
    const { cliente_id, observacao, pedido_produtos, produto_id, quantidade_produto } = req.body;

    for (const campo of camposObrigatorios) {
        if (!req.body[campo]) {
            return res.status(400).json({ mensagem: `O campo ${campo} é obrigatório` })
        }
    }

    const idsProduto = produtos.map(p => p.produto_id);
    const produtosExistentes = await knex('produtos').whereIn('id', idsProduto);

    if (produtosExistentes.length !== produtos.length) {
        return res.status(400).json({ error: 'O(s) produto(s) não existe(m) no banco de dados.' });
    }

    try {
        const pedido = await knex("pedidos")
            .insert({
                cliente_id,
                observacao,
                pedido_produtos,
                produto_id,
                quantidade_produto,
            })
            .returning("*");

        if (!pedido[0]) {
            return res.status(400).json({ mensagem: "O pedido não foi cadastrado" });
        }

        return res.status(200).json(pedido[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastrarPedido
};
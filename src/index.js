require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const categoryRoutes = require('../routes/categoryRoutes');
const userRoutes = require('../routes/userRoutes');
const clientRoutes = require('../routes/clientRoutes');
const productRoutes = require('../routes/productRoutes');

app.use('/categorias', categoryRoutes);
app.use('/usuarios', userRoutes);
app.use('/clientes', clientRoutes);
app.use('/produto', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
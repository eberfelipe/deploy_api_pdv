require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/clients", clientRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API está rodando");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

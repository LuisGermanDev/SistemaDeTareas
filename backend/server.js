const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
//base de datos
const conectDb = require("./config/db");
conectDb();
//rutas
app.use('/',require('./routes/auth'))

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el localhost:${PORT}`);
});

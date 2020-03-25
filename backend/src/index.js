
// Armazenando o módulo express na variável
const express = require('express');

// Importando CORS - Módulo que vai dizer quem vai acessar aplicação
const cors = require('cors');

// Importanto as rotas da minha aplicação
const routes = require('./routes');

// Instanciando o express (chamando o método contrutor '()')
const app = express();

// Usando o CORS
app.use(cors());

// Digo para converter o JSON que vier para algo intendível
app.use(express.json());

// Após importas as rotas, uso o app.use para usar as rotas criadas 
app.use(routes);

app.listen(3333);
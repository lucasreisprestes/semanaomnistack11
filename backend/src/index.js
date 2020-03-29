const express   = require('express');
const routes = require('./routes'); // Importando o arquivo (não é pacote)
const cors = require('cors');

const app = express();

//Posso limitar uma url Front-end para acessar o backEnd
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333); // vai ouvir na porta 


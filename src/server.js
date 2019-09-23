const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

const requireDir = require('require-dir');

require('./database/connection'); //Importa o arquivo de conexão do banco de dados

requireDir('./models'); //Importa o model do user

app.use(express.json());

app.use('/', require('./routes/userRoutes'));

app.use('/kennel', require('./routes/kennelRoutes'));

app.listen(3001);

console.log('Server is running!');
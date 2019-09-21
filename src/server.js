const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

require('./database/connection'); //Importa o arquivo de conexão do banco de dados

require('./models/user'); //Importa o model do user

app.use(express.json());

app.use('/', require('./routes/userRoutes'));

app.use('/kennel', require('./routes/kennelRoutes'));

app.listen(3001);

console.log('Server is running!');
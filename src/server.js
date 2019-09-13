const express = require('express');

const app = express();

require('./database/connection'); //Importa o arquivo de conexão do banco de dados

require('./models/user'); //Importa o model do user

app.use(express.json());

app.use('/api', require('./routes/routes'));

app.listen(3000);

console.log('Server is running!');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = (req, res, next) => { //Next só é chamado se o usuário estiver pronto para dar o próximo passo (ir para o controller), ou seja, se estiver tudo ok, o usuário segue para o controller

  const authHeader = req.headers.authorization; //Busca o header chamado authorization da requisição

  if (!authHeader) {
    return res.status(400).send({error: 'No token provided'}) //Se não tiver token, retorna a reposta 

    //Bearer alsdqeqlkjasdlkakjd : formato "padrão" do token    
  }

  const parts = authHeader.split(' '); //Separa o token em duas partes pelo espaço

  if (!parts.length === 2) {
    return res.status(401).send({error: 'Token error'});
  }

  const [scheme, token] = parts; //scheme recebe a primeita parte do array e token recebe a segunda parte do array

  if (!/^Bearer$/i.test(scheme)) { //Verifica se tem alguma coisa escrita Bearer no scheme (expressão regular / rejex)
    //O '/' indica o começo da rejex, ^ indica o início da verificação, Bearer indica a palavra buscada, $ indica o final da verificação, '/' inidica o final da rejex e o i indica que é uma verificação case sensitive
    return res.status(401).send({error: 'Token malformatted'});
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({error: 'Token invalid'}); //Pode até ter enviado um token, mas ele estava inválido
    }

    req.userId = decoded.id;

    return next();
  });
};
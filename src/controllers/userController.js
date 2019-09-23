const mongoose = require('mongoose');

const User = mongoose.model('User');

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = {    
  async create(req, res){
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.send({error: 'User already exists.', errorId: '1'})  
      }
      
      const user = await User.create(req.body);
    
      user.password = undefined;

      return res.send(
        {user,
        token: generateToken({ id: user.id })}
      );
    } catch (error) {
      return res.send({error: 'User registration failed.', errorId: '2'})
    }
  },

  async authenticate(req, res){
    const {email, password} = req.body;

    if (!await User.findOne({ email })) { //Se não for encontrado o e-mail (ou seja, se for false, negação de true)
      return res.send({error: 'User not found.', errorId: '1'});
    }

    const user = await User.findOne({email}).select('+password'); //.select('+password') seleciona o password do email, pois o mesmo está definido como false no model, ou seja, não é retornado    

    if (!await bcryptjs.compare(password, user.password)) { //O bcrypt.compare verifica se a senha não bate com a senha criptografada
      return res.send({error: 'Invalid password.', errorId: '2'});
    }

    user.password = undefined; //Define a senha como undefined, para não ser mostrada para o cliente
    
    return res.send({ 
      user,
      token: generateToken({ id: user.id})
    });
  }
};

function generateToken(params = {}){
  return token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400 //Expira em 1 dia (86400 segundos)
  });    
}
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {    
  async create(req, res){
    try {
      const {email} = req.body;

      if (User.findOne({email})) {
        res.status(400).send({error: 'User already exists!'})  
      }

      User.create(req.body);
      
      res.status(200).send('User created!');
    } catch (error) {
      res.status(400).send({error: 'User registration failed!'})
    }
  }
};
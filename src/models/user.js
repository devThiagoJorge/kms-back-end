const mongoose = require('mongoose');

const bcrypjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next){ //Antes de salvar um novo user, é feita a encriptada a sua senha
  const hash = await bcrypjs.hash(this.password, 10); //É gerado um hash a partir de sua senha | 10: número de vezes que o hash é gerado, para fortificar a encriptação
  this.password = hash;

  next();
});

mongoose.model('User', userSchema);
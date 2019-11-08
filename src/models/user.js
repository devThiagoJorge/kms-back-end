const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
  cellphone: {
    type: String,
    required: false
  },
  homePhone: {
    type: String,
    required: false
  },
  cep:{
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
userSchema.plugin(mongoosePaginate);
userSchema.pre('save', async function(next){ //Antes de salvar um novo user, é encriptada a sua senha
  const hash = await bcrypjs.hash(this.password, 10); //É gerado um hash a partir de sua senha | 10: número de vezes que o hash é gerado, para fortificar a encriptação
  this.password = hash;

  next();
});

mongoose.model('User', userSchema);
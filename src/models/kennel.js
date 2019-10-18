const mongoose = require('mongoose');

const kennelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  bairro: {
    type: String,
    required: true
  },
  rua: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone1: {
    type: String,
    required: true
  },
  phone2: {
    type: String,
    required: false,
  },
  kennelAdm:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog'
  }]
});

mongoose.model('Kennel', kennelSchema);
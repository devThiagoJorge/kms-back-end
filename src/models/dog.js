const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: { //raça
    type: String,
    required: true
  },
  yearsOld: { //anos de idade
    type: Number,
    required: true
  },
  monthsOld: { //meses de idade
    type: Number,
    required: false
  },
  size: { //porte (pequeno, médio, etc)
    type: String,
    required: true
  },
  coatColor: { //cor da pelagem
    type: String,
    required: true
  },
  weight: { //peso
    type: Number,
    required: false
  },
  baia: {
    type: String,
    required: true
  },
  kennel:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kennel',
    required: true
  }
});

mongoose.model('Dog', dogSchema);



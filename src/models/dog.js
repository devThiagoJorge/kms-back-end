const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: { //raça
    type: String,
    required: true
  },
  // yearsOld: { //anos de idade
  //   type: Number,
  //   required: true
  // },
  // monthsOld: { //meses de idade
  //   type: Number,
  //   required: false
  // },
  birthday:{
    type: String,
    required: true
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
dogSchema.plugin(mongoosePaginate);
mongoose.model('Dog', dogSchema);



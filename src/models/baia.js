const mongoose = require('mongoose');

const baiaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true
  },
  capacidade: {
    type: Number,
    required: false
  },
  kennel:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kennel',
    required: true
  }
});

mongoose.model('Baia', baiaSchema);
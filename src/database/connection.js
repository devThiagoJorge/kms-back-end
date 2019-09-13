const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node-js-learning-project', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
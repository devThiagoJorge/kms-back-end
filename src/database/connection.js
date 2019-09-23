const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/node-js-learning-project',
//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   }
// );

mongoose.connect('mongodb+srv://node-js-learning-user:pltADEaEQ6l6USCh@cluster-01-xxwdd.mongodb.net/kennel-manager-system?retryWrites=true&w=majority',
  {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);
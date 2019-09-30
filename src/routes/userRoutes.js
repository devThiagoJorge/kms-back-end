const expres = require('express');

const routes = expres.Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/auth');

routes.post('/signup', userController.create);

routes.post('/login', userController.authenticate);

routes.get('/user/:email', userController.show);

routes.put('/user/:email', function(req, res) {
  authMiddleware(req, res, function() {
    userController.update(req, res);    
  });
});

module.exports = routes;
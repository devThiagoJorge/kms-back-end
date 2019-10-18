const expres = require('express');

const routes = expres.Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/auth');

routes.post('/signup', userController.create);

routes.post('/login', userController.authenticate);

routes.get('/user/search', userController.index);

routes.get('/user/profile/:email', userController.show);

routes.put('/user/:email', function(req, res) {
  authMiddleware(req, res, function() {
    userController.update(req, res);    
  });
});

routes.delete('/user/:email', function(req, res) {
  authMiddleware(req, res, function() {
    userController.delete(req, res);    
  });
});

module.exports = routes;
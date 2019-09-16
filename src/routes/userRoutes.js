const expres = require('express');

const routes = expres.Router();

const userController = require('../controllers/userController');

routes.post('/register', userController.create);

routes.post('/authenticate', userController.authenticate);

module.exports = routes;
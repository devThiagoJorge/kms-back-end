const expres = require('express');

const routes = expres.Router();

const userController = require('../controllers/userController');

routes.post('/signup', userController.create);

routes.post('/login', userController.authenticate);

module.exports = routes;
const expres = require('express');

const routes = expres.Router();

const userController = require('../controllers/userController');

routes.post('/register', userController.create);

module.exports = routes;
const expres = require('express');

const routes = expres.Router();

const authMiddleware = require('../middlewares/auth');

const projectController = require('../controllers/projectController');

routes.use(authMiddleware);  

routes.get('/', projectController.ok);
  
module.exports = routes;
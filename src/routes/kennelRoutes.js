const expres = require('express');

const routes = expres.Router();

const authMiddleware = require('../middlewares/auth');

const kennelController = require('../controllers/kennelController');

routes.use(authMiddleware);  

routes.get('/', kennelController.ok);
  
module.exports = routes;
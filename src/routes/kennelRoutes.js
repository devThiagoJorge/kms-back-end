const expres = require('express');

const routes = expres.Router();

const authMiddleware = require('../middlewares/auth');

const kennelController = require('../controllers/kennelController');

routes.use(authMiddleware);  

routes.get('/', kennelController.list);

routes.get('/:id', kennelController.show);

routes.post('/', kennelController.create);

routes.put('/:id', kennelController.update);

routes.delete('/:id', kennelController.delete);
  
module.exports = routes;
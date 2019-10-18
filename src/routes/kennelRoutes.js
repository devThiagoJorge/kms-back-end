const expres = require('express');

const routes = expres.Router();

const authMiddleware = require('../middlewares/auth');

const kennelController = require('../controllers/kennelController');

routes.use(authMiddleware);  

routes.post('/', kennelController.create);

routes.get('/search', kennelController.index);

routes.get('/:id', kennelController.show);

routes.put('/:id', kennelController.update);

routes.delete('/:id', kennelController.delete);
  
module.exports = routes;
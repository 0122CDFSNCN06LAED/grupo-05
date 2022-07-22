const { Router } = require('express');
const proyectController = require('../controllers/proyect-controller');
const validacion = require('../middlewares/proyecto-middleware');
const authGuestMiddleware = require('../middlewares/auth-guest-middleware');
const proyectRouter = Router();

proyectRouter.get('/', authGuestMiddleware, proyectController.proyectsList);
proyectRouter.get(
  '/proposals', //muestra la lista de propuestas de un proyecto puntual. (vista de empresa)
  authGuestMiddleware,
  proyectController.proyectProposals
);
proyectRouter.get(
  '/proyectosAll', //muestra la lista de propuestas de un proyecto puntual. (vista de empresa)
  authGuestMiddleware,
  proyectController.proyectosAll
);

/* obtener un detalle en específico */
proyectRouter.get(
  '/detail/:id/',
  authGuestMiddleware,
  proyectController.detail
);
/*** CREAR UN PRODUCTO ***/
proyectRouter.get('/create', authGuestMiddleware, proyectController.create);
proyectRouter.post(
  '/',
  validacion.validacionCreate,
  authGuestMiddleware,
  proyectController.store
);
/*** EDITAR UN PRODUCTO ***/
proyectRouter.get('/edit/:id', authGuestMiddleware, proyectController.edit);
proyectRouter.get('/delete/:id', authGuestMiddleware, proyectController.delete);
proyectRouter.put(
  '/:id',
  validacion.validacionCreate,
  authGuestMiddleware,
  proyectController.update
);
/*** ELIMINAR UN PRODUCTO ***/
proyectRouter.delete('/:id', authGuestMiddleware, proyectController.delete);
module.exports = proyectRouter;

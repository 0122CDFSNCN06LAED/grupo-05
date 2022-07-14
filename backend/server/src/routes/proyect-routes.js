const { Router } = require("express");
const proyectController = require("../controllers/proyect-controller");
const validacion = require("../middlewares/proyecto-middleware");
const authGuestMiddleware = require("../middlewares/auth-guest-middleware");
const proyectRouter = Router();

proyectRouter.get("/", authGuestMiddleware, proyectController.proyectsList);
proyectRouter.get(
  "/proposals",
  authGuestMiddleware,
  proyectController.proyectProposals
);
/* obtener un detalle en específico */
proyectRouter.get(
  "/detail/:id/",
  authGuestMiddleware,
  proyectController.detail
);
/*** CREAR UN PRODUCTO ***/
proyectRouter.get("/create", authGuestMiddleware, proyectController.create);
proyectRouter.post(
  "/",
  validacion.validacionCreate,
  authGuestMiddleware,
  proyectController.store
);
/*** EDITAR UN PRODUCTO ***/
proyectRouter.get("/edit/:id", authGuestMiddleware, proyectController.edit);
proyectRouter.put(
  "/:id",
  validacion.validacionCreate,
  authGuestMiddleware,
  proyectController.update
);
/*** ELIMINAR UN PRODUCTO ***/
proyectRouter.delete("/:id", authGuestMiddleware, proyectController.delete);
module.exports = proyectRouter;

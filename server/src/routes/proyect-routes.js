const { Router } = require("express");
const proyectController = require("../controllers/proyect-controller");
const validacion = require("../middlewares/proyecto-middleware");
const proyectRouter = Router();

proyectRouter.get("/", proyectController.proyectsList);
proyectRouter.get("/proposals", proyectController.proyectProposals);
/* obtener un detalle en específico */
proyectRouter.get("/detail/:id/", proyectController.detail);
/*** CREAR UN PRODUCTO ***/
proyectRouter.get("/create", proyectController.create);
proyectRouter.post("/", validacion.validacionCreate, proyectController.store);
/*** EDITAR UN PRODUCTO ***/
proyectRouter.get("/edit/:id", proyectController.edit);
proyectRouter.put("/:id", proyectController.update);
/*** ELIMINAR UN PRODUCTO ***/
proyectRouter.delete("/:id", proyectController.delete);
module.exports = proyectRouter;

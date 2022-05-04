const { Router } = require("express");
const proyectController = require("../controllers/proyect-controller");
const proyectRouter = Router();

proyectRouter.get("/", proyectController.proyectsList);
proyectRouter.get("/proposals", proyectController.proyectProposals);
/* obtener un detalle en específico */
proyectRouter.get("/detail/:id/", proyectController.detail);
proyectRouter.get("/create", proyectController.create);
proyectRouter.post("/", proyectController.store);
proyectRouter.get("/edit/:id", proyectController.edit);
proyectRouter.get("/delete/:id", proyectController.delete);
module.exports = proyectRouter;

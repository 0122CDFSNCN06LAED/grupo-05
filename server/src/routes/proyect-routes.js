const { Router } = require("express");
const proyectController = require("../controllers/proyect-controller");
const proyectRouter = Router();

proyectRouter.get("/", proyectController.proyectsList);
proyectRouter.get("/proposal-list", proyectController.proyectProposals);
proyectRouter.get("/bidding-detail", proyectController.biddingDetail);
/* obtener un detalle en específico */
proyectRouter.get("/bidding-detail/:id/", proyectController.detail);
proyectRouter.get("/bidding-list", proyectController.biddingList);
proyectRouter.get("/bidding-creation", proyectController.biddingCreation);
proyectRouter.get("/bidding-edition", proyectController.biddingEdition);

module.exports = proyectRouter;

const { Router } = require("express");
const mainController = require("../controllers/main-controller");
const mainRouter = Router();
const { check } = require("express-validator");

let validation = [
  check("apellidoUsuario").notEmpty().withMessage("debe ingresar un apellido"),
  check("nombreUsuario").notEmpty().withMessage("debe ingresar un nombre").bail().isLength({ min: 5 }).withMessage("al menos 5 caracteres"),
];

mainRouter.get("/", mainController.index);
mainRouter.get("/register", mainController.register);
mainRouter.get("/login", mainController.login);
mainRouter.get("/mailbox", mainController.mailbox);
mainRouter.get("/portfolio", mainController.portfolio);
mainRouter.get("/config", mainController.config);
mainRouter.post("/configEditarUsuario", validation, mainController.configEditarUsuario);
mainRouter.get("/proposal-list", mainController.proposalList);
mainRouter.get("/bidding-detail", mainController.biddingDetail);
mainRouter.get("/bidding-list", mainController.biddingList);
mainRouter.get("/bidding-creation", mainController.biddingCreation);
mainRouter.get("/bidding-edition", mainController.biddingEdition);
module.exports = mainRouter;

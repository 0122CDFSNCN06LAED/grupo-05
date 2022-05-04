const { Router } = require("express");
const mainController = require("../controllers/main-controller");
const mainRouter = Router();

mainRouter.get("/", mainController.index);
mainRouter.get("/register", mainController.register);
mainRouter.get("/login", mainController.login);
mainRouter.get("/mailbox", mainController.mailbox);
mainRouter.get("/portfolio", mainController.portfolio);
mainRouter.get("/config", mainController.config);
mainRouter.post("/configEditarUsuario", mainController.configEditarUsuario);

module.exports = mainRouter;

const { Router } = require("express");
const mainController = require("../controllers/main-controller");
const mainRouter = Router();
const authGuestMiddleware = require("../middlewares/auth-guest-middleware");
const validacion = require("../middlewares/user-middleware");

mainRouter.get("/", authGuestMiddleware, mainController.index);
mainRouter.post("/", validacion.validacionLogin, mainController.loginForm);

module.exports = mainRouter;

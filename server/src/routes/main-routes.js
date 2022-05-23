const { Router } = require("express");
const mainController = require("../controllers/main-controller");
const mainRouter = Router();
const authGuestMiddleware = require("../middlewares/auth-guest-middleware");

mainRouter.get("/", authGuestMiddleware, mainController.index);

module.exports = mainRouter;

const { Router } = require("express");
const userController = require("../controllers/user-controller");
const validacion = require("../middlewares/user-middleware");
const userRouter = Router();
const guestMiddleware = require("../middlewares/guest-middleware");

userRouter.get("/", userController.config);
userRouter.get("/register", guestMiddleware, userController.register);
userRouter.post(
  "/register",
  validacion.validacionRegistro,
  userController.registerBoton
);
userRouter.get("/login", userController.login);
userRouter.post(
  "/login",
  validacion.validacionLogin,
  userController.loginBoton
);
userRouter.get("/logout", userController.logout);
userRouter.get("/mailbox", userController.mailbox);
userRouter.get("/portfolio", userController.portfolio);
userRouter.get("/config", userController.config);
userRouter.get("/configEditarUsuario", userController.configEditarUsuario);
userRouter.put("/configEditarUsuario", userController.configUpdateUsuario);

module.exports = userRouter;

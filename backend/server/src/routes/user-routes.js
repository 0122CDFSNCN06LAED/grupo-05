const { Router } = require("express");
const userController = require("../controllers/user-controller");
const validacion = require("../middlewares/user-middleware");
const userRouter = Router();
const guestMiddleware = require("../middlewares/guest-middleware");
const authGuestMiddleware = require("../middlewares/auth-guest-middleware");
const uploadImages = require("../middlewares/uploadImagen");

userRouter.get("/", userController.config);

userRouter.get("/register", guestMiddleware, userController.register);
userRouter.post(
  "/register",
  uploadImages.single("avatar"),
  validacion.validacionRegistro,
  userController.registerForm
);

userRouter.get("/login", userController.login);
/* userRouter.post("/", validacion.validacionLogin, userController.loginForm); */
userRouter.post("/logout", userController.logout);
userRouter.get("/mailbox", authGuestMiddleware, userController.mailbox);
userRouter.get(
  '/mailbox/:id/',
  authGuestMiddleware,
  userController.detailMessage
);
userRouter.get("/createMessage", authGuestMiddleware, userController.message);
userRouter.post("/createMessage", authGuestMiddleware, validacion.validacionMensaje, userController.createMessage);
userRouter.get("/portfolio", authGuestMiddleware, userController.portfolio);
userRouter.get("/config", authGuestMiddleware, userController.config);
userRouter.get(
  "/configEditarUsuario",
  authGuestMiddleware,
  userController.configEditarUsuario
);
userRouter.put(
  "/configEditarUsuario",
  authGuestMiddleware,
  userController.configUpdateUsuario
);

/* router.post("/subir-archivo", upload.any(), fileController.upload); */

module.exports = userRouter;

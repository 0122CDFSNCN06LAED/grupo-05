const { Router } = require("express");
const proyectApiRouter = Router();
const proyectAPIController = require("../../controllers/api/proyectAPIController");
const cors = require("cors");
proyectApiRouter.get("/", cors("*"), proyectAPIController.list);
proyectApiRouter.get("/:id", cors("*"), proyectAPIController.detail);

module.exports = proyectApiRouter;

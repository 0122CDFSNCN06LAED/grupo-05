const { Router } = require("express");
const userRouter = Router();
const userAPIController = require("../../controllers/api/userAPIController");
const cors = require("cors");
userRouter.get("/", cors("*"), userAPIController.list);
userRouter.get("/:id", cors("*"), userAPIController.detail);

module.exports = userRouter;

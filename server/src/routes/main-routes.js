const { Router } = require("express");
const mainController = require("../controllers/main-controller");
const mainRouter = Router();

mainRouter.get("/", mainController.index);
mainRouter.get("/register", mainController.register);
// mainRouter.get("/mailbox", mainController.mailbox);
// mainRouter.get("/portfolio", mainController.portfolio);
// mainRouter.get("/config", mainController.config);
// mainRouter.get("/login", mainController.login);
// mainRouter.get("/proposal-list", mainController.proposal - list);
// mainRouter.get("/bidding-detail", mainController.bidding - detail);
//Cómo llamamos a un objeto nombrado con kebab case?

module.exports = mainRouter;
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/index.html"));
// });

// app.get("/mailbox", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/mailbox.html"));
// });

// app.get("/portfolio", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/portfolio.html"));
// });

// app.get("/config", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/config.html"));
// });

// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/register.html"));
// });
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/login.html"));
// });
// app.get("/proposal-list", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/proposal-list.html"));
// });
// app.get("/bidding-detail", (req, res) => {
//   res.sendFile(path.join(__dirname, "./views/bidding-detail.html"));
// });

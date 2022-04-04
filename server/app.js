const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

/*Middelware*/
app.use(express.static("public")); //sirve para establecer donde estan ubicados los archivos estaticos de nuestra aplicacion

/* Routing*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});
app.get("/proposal-list", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/proposal-list.html"));
});
app.get("/bidding-detail", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/bidding-detail.html"));
});
/*SErver */
app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}\n http://localhost:${port}`));

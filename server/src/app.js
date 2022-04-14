const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const mainRouter = require("./routes/main-routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}\n http://localhost:${port}`));

app.use(express.static(path.join(__dirname, "../public"))); //sirve para establecer donde estan ubicados los archivos estaticos de nuestra aplicacion
app.use(mainRouter);

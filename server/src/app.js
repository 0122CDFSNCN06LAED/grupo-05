const express = require("express");
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");

const app = express();

app.listen(port, () =>
  console.log(
    `Servidor levantado en el puerto ${port}\n http://localhost:${port}`
  )
);

//Middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//Route system
const mainRouter = require("./routes/main-routes");
const proyectRouter = require("./routes/proyect-routes");

app.use("/", mainRouter);
app.use("/proyect", proyectRouter);

//Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

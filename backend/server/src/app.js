const express = require("express");
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require("./middlewares/user-logged-middleware");

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
app.use(
  session({
    secret: "proyecto digital house",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookies());
app.use(userLoggedMiddleware);

//Route system
const mainRouter = require("./routes/main-routes");
const proyectRouter = require("./routes/proyect-routes");
const userRouter = require("./routes/user-routes");

app.use("/", mainRouter);
app.use("/proyect", proyectRouter);
app.use("/user", userRouter);
app.use(
  session({
    secret: "proyecto digital house",
    resave: true,
    saveUninitialized: true,
  })
);

//Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// //Colección de recursos de (APIs)
const proyectApiRouter = require("./routes/api/proyectApiRouter");
const userApiRouter = require("./routes/api/userApiRouter");
app.use("/api/proyectApiRouter", proyectApiRouter);
app.use("/api/userApiRouter", userApiRouter);

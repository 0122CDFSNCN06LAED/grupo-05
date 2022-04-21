const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const mainRouter = require("./routes/main-routes");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, () =>
  console.log(
    `Servidor levantado en el puerto ${port}\n http://localhost:${port}`
  )
);

app.use(express.static(path.join(__dirname, "../public"))); //sirve para establecer donde estan ubicados los archivos estaticos de nuestra aplicacion
app.use(mainRouter);

const { check, validationResult } = require("express-validator");

let validation = [
  check("apellidoUsuario").notEmpty().withMessage("debe ingresar un apellido"),
  check("emailUsuario")
    .notEmpty()
    .withMessage("debe ingresar un email")
    .bail()
    .isEmail()
    .withMessage("el formato del correo ingresado no es válido"),
  check("nombreUsuario")
    .notEmpty()
    .withMessage("debe ingresar un nombre")
    .bail()
    .isLength({ min: 5 })
    .withMessage("al menos 5 caracteres"),
];

app.use(express.json());

app.post("/configEditarUsuario", validation, (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body);
    return res.status(400).json({ errors: errors.array() });
  } else {
    res.render("config");
  }
});

app.post(
  "/user",
  check("apellido").notEmpty().withMessage("debe ingresar un apellido"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.render("config");
    }
  }
);

/* const Usuario = require('../models/usuario') */
/* por ahora esto, hasta que no estén los modelos */
const fs = require("fs");
const path = require("path");
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  let emailCookie = req.cookies.emailUsuario;
  usuarios.forEach((element) => {
    if ((element.emailUsuario = emailCookie)) {
      req.session.usuarioLogged = element;
    }
  });

  if (req.session.usuarioLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.usuarioLogged;
  } /* else {
    if (req.url != "/user/login") {
      console.log("holis");
      res.render("login", { noUsuario: "", malContrasenia: "" });
    }
  } */
  next();
}

module.exports = userLoggedMiddleware;

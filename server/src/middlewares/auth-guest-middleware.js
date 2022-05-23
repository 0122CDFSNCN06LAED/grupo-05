function authGuestMiddleware(req, res, next) {
  if (!req.session.usuarioLogged) {
    return res.render("login", { noUsuario: "", malContrasenia: "" });
  }
  next();
}

module.exports = authGuestMiddleware;

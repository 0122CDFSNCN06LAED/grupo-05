function authGuestMiddleware(req, res, next) {
  if (!req.session.usuarioLogged) {
    return res.render("notFound");
  }
  next();
}

module.exports = authGuestMiddleware;

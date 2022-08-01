function guestMiddleware(req, res, next) {
  if (req.session.usuarioLogged) {
    return res.redirect("/user/login");
  }
  next();
}

module.exports = guestMiddleware;

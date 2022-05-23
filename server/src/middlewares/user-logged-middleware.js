function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  if (req.session.usuarioLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.usuarioLogged;
  }
  next();
}

module.exports = userLoggedMiddleware;

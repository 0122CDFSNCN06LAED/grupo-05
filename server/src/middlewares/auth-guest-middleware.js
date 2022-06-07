function authGuestMiddleware(req, res, next) {
  if (!req.session.usuarioLogged) {
    return res.redirect('user/login');
  } else {
    next();
  }
}

module.exports = authGuestMiddleware;

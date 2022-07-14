function authGuestMiddleware(req, res, next) {
  if (!req.session.userLogged) {
    return res.redirect('user/login');
  } else {
    next();
  }
}

module.exports = authGuestMiddleware;

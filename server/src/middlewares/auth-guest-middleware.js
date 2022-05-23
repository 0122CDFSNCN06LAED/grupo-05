function authGuestMiddleware(req, res, next) {
  if (!req.session) {
    return res.redirect("/user/login");
  }
  next();
}

module.exports = authGuestMiddleware;

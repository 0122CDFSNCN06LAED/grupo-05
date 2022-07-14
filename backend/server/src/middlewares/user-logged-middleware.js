const db = require('../../database/models');

const userLoggedMiddleware = async (req, res, next) => {
  try {
    const usuarios = await db.Usuarios.findAll();
    res.locals.isLogged = false;
    let emailCookie = req.cookies.emailUsuario;
    usuarios.forEach((element) => {
      if ((element.emailUsuario = emailCookie)) {
        req.session.userLogged = element;
      }
    });

    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    } else {
      let usuarioEncontrado;
      usuarios.forEach((element) => {
        if (element.email == req.body.email) {
          usuarioEncontrado = element;
          res.locals.userLogged = usuarioEncontrado;
        }
      });
    }
    next();
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = userLoggedMiddleware;

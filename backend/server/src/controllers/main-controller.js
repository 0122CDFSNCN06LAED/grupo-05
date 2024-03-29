const db = require('../../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
  index: async (req, res) => {
    try {

      const proyectos = await db.Proyectos.findAll({
        where: {
          estadoId: 1
        }
      });
      const categorias = await db.Categorias.findAll();
      const proyectoCategoria = await db.ProyectoCategoria.findAll();

      //últimos 5 proyectos creados activos
      let ultimosProyectos = proyectos.sort((o1, o2) => {
        if (o1.fechaCreacion < o2.fechaCreacion) {
          return -1;
        } else if (o1.fechaCreacion > o2.fechaCreacion) {
          return 1;
        } else {
          return 0;
        }
      });

      res.render('index', {
        listaProyectos: proyectos,
        listaCategorias: categorias,
        listaProyCat: proyectoCategoria,
        ultimosProyectos: ultimosProyectos
      });
    } catch (error) {
      console.log(error);
    }
  },
  loginForm: async (req, res) => {
    try {
      let errors = validationResult(req);
      let usuarioEncontrado;

      if (errors.isEmpty()) {


        const user = await db.Usuarios.findOne({
          where: {
            email: req.body.email, /* include usuarioTipo */
          },
        });

        if (user) {
          //verifico contraseña
          /* BELEN - VER HASH de contraseña para hacer blanqueo de clave forzada 
          let apss = bcrypt.hashSync('12345', 10);
          console.log(apss);*/

          let correcto = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (correcto) {
            req.session.userLogged = user;
            //busco el nombre de tipo de usuario para enviarlo al header
            let usuarioTipo = await db.TipoUsuarios.findAll();/* esto no iría */
            usuarioTipo.forEach((element) => {
              if (element.id == req.session.userLogged.tipoUsuarioId) {
                usuarioTipo = element.nombreTipoUsuario;
              }
            });
            req.session.userLogged.tipoUsuario = usuarioTipo;
            if (req.body.remember == 'on') {
              /*               res.cookie('emailUsuario', req.body.email, {
                              maxAge: 1000 * 60 * 2,
                            }); */
            }
            let proyectos = await db.Proyectos.findAll({
              where: {
                estadoId: 1
              }
            });
            let categorias = await db.Categorias.findAll();
            let proyCat = await db.ProyectoCategoria.findAll();
            let ultimosProyectos = proyectos.sort((o1, o2) => {
              if (o1.fechaCreacion < o2.fechaCreacion) {
                return -1;
              } else if (o1.fechaCreacion > o2.fechaCreacion) {
                return 1;
              } else {
                return 0;
              }
            });
            res.render('index', {
              user: req.session.userLogged,
              /* tipoUsuario: usuarioTipo, */
              listaProyectos: proyectos,
              listaCategorias: categorias,
              listaProyCat: proyCat,
              noUsuario: '',
              malContrasenia: '',
              ultimosProyectos: ultimosProyectos
            });
          } else {
            res.render('login', {
              malContrasenia: 'Contraseña incorrecta',
              noUsuario: '',
              old: req.body,
              usuario: '',
              tipoUsuario: '',
            });
          }
        } else {
          res.render('login', {
            errors: errors.mapped(),
            noUsuario: 'Usuario no registrado',
            malContrasenia: '',
            old: req.body,
            usuario: '',
            tipoUsuario: '',
          });
        }
      } else {
        res.render('login', {
          errors: errors.mapped(),
          noUsuario: 'Usuario no registrado',
          malContrasenia: '',
          old: req.body,
          usuario: '',
          tipoUsuario: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

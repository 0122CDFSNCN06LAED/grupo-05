const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
  index: async (req, res) => {
    try {
      const proyectos = await db.Proyectos.findAll();
      console.log(proyectos, 'proyectos');
      const categorias = await db.Categorias.findAll();
      console.log(categorias, 'categorias');
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      console.log(proyectoCategoria, 'proyectoCategoria');

      res.render('index', {
        listaProyectos: proyectos,
        listaCategorias: categorias,
        listaProyCat: proyectoCategoria,
      });
    } catch (error) {
      console.log(error);
    }
  },
  loginForm: async (req, res) => {
    try {
      let errors = validationResult(req);
      let usuarioEncontrado;

      const user = await db.Usuarios.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        usuarioEncontrado = user;
      }
      if (errors.isEmpty()) {
        if (usuarioEncontrado) {
          //verifico contraseña
          let correcto = bcrypt.compareSync(
            req.body.password,
            usuarioEncontrado.password
          );
          if (correcto == true) {
            req.session.userLogged = usuarioEncontrado;
            //busco el nombre de tipo de usuario para enviarlo al header
            let usuarioTipo = await db.TipoUsuarios.findAll();
            usuarioTipo.forEach((element) => {
              if (element.id == req.session.userLogged.tipoUsuarioId) {
                usuarioTipo = element.nombreTipoUsuario;
              }
            });
            req.session.userLogged.tipoUsuario = usuarioTipo;
            if (req.body.remember == 'on') {
              res.cookie('emailUsuario', req.body.email, {
                maxAge: 1000 * 60 * 2,
              });
            }
            let proyectos = await db.Proyectos.findAll();
            let categorias = await db.Categorias.findAll();
            let proyCat = await db.ProyectoCategoria.findAll();
            res.render('index', {
              user: req.session.userLogged,
              /* tipoUsuario: usuarioTipo, */
              listaProyectos: proyectos,
              listaCategorias: categorias,
              listaProyCat: proyCat,
              noUsuario: '',
              malContrasenia: '',
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

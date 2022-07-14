const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');

module.exports = {
  register: (req, res) => {
    res.render('register');
  },
  registerForm: async (req, res) => {
    //realizar findAll de tipoUsuarios
    try {
      //Por qué en el registerForm y no en el login?
      const proyectos = await db.Proyectos.findAll();
      const categorias = await db.Categorias.findAll();
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      let tipoUsuarioId = 1;
      if (req.body.tipoUsuarioId == 'freelancer') {
        tipoUsuarioId = 2;
      }
      let newUser = {
        username: req.body.usuarioNombre,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        tipoUsuarioId: tipoUsuarioId,
      };
      if (req.file) {
        newUser.profileURL = `/images/user-images/${req.file.filename}`;
      }
      await db.Usuarios.create(newUser);
      users.push(newUser);
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        res.locals.userLogged = newUser;
        req.session.userLogged = newUser;
        res.render('index', {
          errors: errors.mapped(),
          user: req.session.userLogged,
          listaProyectos: proyectos,
          listaCategorias: categorias,
          listaProyCat: proyectoCategoria,
          noUsuario: '',
          malContrasenia: '',
        });
      } else {
        res.render('register', { errors: errors.mapped(), old: req.body });
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: (req, res) => {
    res.render('login', { noUsuario: '', malContrasenia: '' });
  },

  // loginForm: async (req, res) => {
  //   try {
  //     let errors = validationResult(req);
  //     let usuarioEncontrado;

  //     const user = await db.Usuarios.findOne({
  //       where: {
  //         email: req.body.email,
  //       },
  //     });
  //     if (user) {
  //       usuarioEncontrado = user;
  //     }
  //     if (errors.isEmpty()) {
  //       if (usuarioEncontrado) {
  //         //verifico contraseña
  //         let correcto = bcrypt.compareSync(
  //           req.body.password,
  //           usuarioEncontrado.password
  //         );
  //         if (correcto == true) {
  //           req.session.userLogged = usuarioEncontrado;
  //           //busco el nombre de tipo de usuario para enviarlo al header
  //           let usuarioTipo;
  //           usuariosTipo.forEach((element) => {
  //             if (
  //               element.idTipoUsuario == req.session.userLogged.tipoUsuarioId
  //             ) {
  //               usuarioTipo = element.nombreTipoUsuario;
  //             }
  //           });
  //           req.session.userLogged.tipoUsuario = usuarioTipo;
  //           if (req.body.remember == "on") {
  //             res.cookie("emailUsuario", req.body.email, {
  //               maxAge: 1000 * 60 * 2,
  //             });
  //           }
  //           let proyectos = await db.Proyectos.findAll();
  //           let categorias = await db.Categorias.findAll();
  //           let proyCat = await db.ProyectoCategoria.findAll();
  //           res.render("index", {
  //             user: req.session.userLogged,
  //             /* tipoUsuario: usuarioTipo, */
  //             listaProyectos: proyectos,
  //             listaCategorias: categorias,
  //             listaProyCat: proyCat,
  //             noUsuario: "",
  //             malContrasenia: "",
  //           });
  //         } else {
  //           res.render("login", {
  //             malContrasenia: "Contraseña incorrecta",
  //             noUsuario: "",
  //             old: req.body,
  //             usuario: "",
  //             tipoUsuario: "",
  //           });
  //         }
  //       } else {
  //         res.render("login", {
  //           errors: errors.mapped(),
  //           noUsuario: "Usuario no registrado",
  //           malContrasenia: "",
  //           old: req.body,
  //           usuario: "",
  //           tipoUsuario: "",
  //         });
  //       }
  //     } else {
  //       res.render("login", {
  //         errors: errors.mapped(),
  //         noUsuario: "Usuario no registrado",
  //         malContrasenia: "",
  //         old: req.body,
  //         usuario: "",
  //         tipoUsuario: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  logout: (req, res) => {
    res.render('register');
  },
  mailbox: async (req, res) => {
    try {
      const mensajes = await db.Mensajes.findAll();
      const listaUsuarios = await db.Usuarios.findAll();
      let mensajesRemitente = [];
      let mensajesDestinatario = [];
      mensajes.forEach((m) => {
        if (m.destinatarioId == req.session.userLogged.id) {
          mensajesRemitente.push(m);
        } else if (m.remitenteId == req.session.userLogged.id) {
          mensajesDestinatario.push(m);
        }
      });
      console.log(
        'mensajesRem',
        mensajesRemitente,
        'mensajesDest',
        mensajesDestinatario
      );
      if (mensajesRemitente || mensajesDestinatario) {
        res.render('mailbox', {
          mensajesRemitente: mensajesRemitente,
          mensajesDestinatario: mensajesDestinatario,
          /*  proyectos: proyects, */
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  portfolio: (req, res) => {
    res.render('portfolio');
  },
  config: (req, res) => {
    res.render('config');
  },
  configEditarUsuario: (req, res) => {
    res.render('portfolio');
  },
  configUpdateUsuario: (req, res) => {},
};

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');
const { Op } = require('sequelize');

module.exports = {
  register: (req, res) => {
    res.render('register', { repetidoEmail: '', repetidoUsername: '' });
  },
  registerForm: async (req, res) => {
    try {
      const proyectos = await db.Proyectos.findAll();
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
      console.log('kkkkkk', ultimosProyectos)
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
      let errors = validationResult(req);


      const usuario = await db.Usuarios.findOne({
        where: {
          email: req.body.email
        }
      })
      if (usuario) {
        res.render('register', { errors: errors.mapped(), old: req.body, repetidoEmail: 'Ya existe un usuario con este email', repetidoUsername: '' });
        return
      }
      const usuario2 = await db.Usuarios.findOne({
        where: {
          username: req.body.usuarioNombre
        }
      })
      if (usuario2) {
        res.render('register', { errors: errors.mapped(), old: req.body, repetidoEmail: '', repetidoUsername: 'Ya existe un usuario con este nombre' });
        return
      }

      await db.Usuarios.create(newUser);
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
          repetidoEmail: '',
          repetidoUsername: '',
          ultimosProyectos: ultimosProyectos
        });
      } else {
        res.render('register', { errors: errors.mapped(), old: req.body, repetidoEmail: '', repetidoUsername: '' });
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
    console.log('logoutttt');
    res.locals.userLogged = null;
    req.session.userLogged = null;
    console.log(
      'local',
      res.locals.userLogged,
      'session',
      req.session.userLogged /* 'cookie', req.cookie */
    );
    res.redirect('/user/login');
  },
  mailbox: async (req, res) => {
    try {
      const mensajes = await db.Mensajes.findAll({
        where: {
          [Op.or]: [
            { destinatarioId: req.session.userLogged.id },
            { remitenteId: req.session.userLogged.id },
          ],
        },
      });
      let participantes = [];
      for (let i = 0; i < mensajes.length; i++) {
        //busco el destinatarioId
        if (mensajes[i].remitenteId == req.session.userLogged.id) {
          let partipante = await db.Usuarios.findOne({
            where: {
              id: mensajes[i].destinatarioId,
            },
          });
          participantes.push(partipante);
          //busco por remitente
        } else {
          let partipante = await db.Usuarios.findOne({
            where: {
              id: mensajes[i].remitenteId,
            },
          });
          participantes.push(partipante);
        }
      }
      let participantesId = [];
      participantes.forEach((element) => {
        participantesId.push(element.id);
      });
      //elimino los usuarios repetidos
      let usuariosUnicosId = participantesId.filter((item, index) => {
        return participantesId.indexOf(item) === index;
      });
      console.log('idddd', usuariosUnicosId);
      let usuariosUnicos = [];
      for (let j = 0; j < usuariosUnicosId.length; j++) {
        let user = await db.Usuarios.findOne({
          where: {
            id: usuariosUnicosId[j],
          },
        });
        usuariosUnicos.push(user);
      }
      console.log('usuariosssss', usuariosUnicos);

      if (usuariosUnicos) {
        res.render('mailbox', {
          usuarios: usuariosUnicos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  message: async (req, res) => {
    try {
      const usuarios = await db.Usuarios.findAll();
      let mensajeEnviado = '';
      res.render('create-message', {
        usuarios: usuarios,
        error: '',
        errors: '',
        mensajeEnviado: mensajeEnviado,
      });
    } catch (error) {
      console.log(error);
    }
  },
  createMessage: async (req, res) => {
    try {
      const usuarios = await db.Usuarios.findAll();
      let errors = validationResult(req);
      let mensajeEnviado = '';
      if (errors.isEmpty()) {
        if (req.body.destinatario == req.session.userLogged.id) {
          res.render('create-message', {
            usuarios: usuarios,
            old: req.body,
            error: 'No se puede enviar un mensaje a sí mismo',
            errors: '',
            mensajeEnviado: mensajeEnviado,
          });
        } else {
          newMensaje = {
            ...req.body,
            id: '',
            contenidoMensaje: req.body.mensaje,
            fechaMensaje: new Date(),
            destinatarioId: req.body.destinatario,
            remitenteId: req.session.userLogged.id,
          };
          console.log('newwwww', newMensaje);
          await db.Mensajes.create(newMensaje);
          mensajeEnviado = 'Mensaje Enviado';
          res.render('create-message', {
            usuarios: usuarios,
            old: req.body,
            error: '',
            errors: '',
            mensajeEnviado: mensajeEnviado,
          });
        }
      } else {
        res.render('create-message', {
          usuarios: usuarios,
          old: req.body,
          error: '',
          errors: errors.mapped(),
          mensajeEnviado: mensajeEnviado,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  detailMessage: async (req, res) => {
    try {
      /* Esta pantalla no es dinámica, habría que arreglarla */
      const idParam = req.params.id;
      const usuario = await db.Usuarios.findOne({
        where: {
          id: idParam,
        },
      });
      const mensajes = await db.Mensajes.findAll({
        where: {
          [Op.or]: [
            { destinatarioId: usuario.id },
            { remitenteId: usuario.id },
          ],
        },
      });
      let mensajesUtiles = [];
      for (let i = 0; i < mensajes.length; i++) {
        if (
          mensajes[i].remitenteId == req.session.userLogged.id ||
          mensajes[i].destinatarioId == req.session.userLogged.id
        ) {
          mensajesUtiles.push(mensajes[i]);
        }
      }

      /* var array = [
        {
          fechas: "30-10",
          registros: 52
        },
        {
          fechas: "17-10",
          registros: 9
        },
        {
          fechas: "26-10",
          registros: 8
        },
        {
          fechas: "24-10",
          registros: 5
        }
      ];
      console.log('array1', array)
      array.sort((a, b) => a.fechas - b.fechas);
      console.log('array2', array) */

      //ordeno los mensajes utiles para enviar a la vista
      let mensajesOrdenados = mensajesUtiles.sort((o1, o2) => {
        if (o1.fechaMensaje < o2.fechaMensaje) {
          return -1;
        } else if (o1.fechaMensaje > o2.fechaMensaje) {
          return 1;
        } else {
          return 0;
        }
      });

      res.render('message-detail', {
        mensajes: mensajesOrdenados,
        usuario: usuario,
      });
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
  configUpdateUsuario: (req, res) => { },
};

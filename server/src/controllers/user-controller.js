const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../../database/models");

/* Mensajes*/
const mensajesFilePath = path.join(__dirname, "../data/mensajes.json");
const mensajes = JSON.parse(fs.readFileSync(mensajesFilePath, "utf-8"));
/* Usuarios */
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
const users = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

/* Tipo usuario */
const usuariosTipoFilePath = path.join(__dirname, "../data/tipoUsuario.json");
const usuariosTipo = JSON.parse(fs.readFileSync(usuariosTipoFilePath, "utf-8"));

/* Proyectos */
const proyectosFilePath = path.join(__dirname, "../data/proyectos.json");
const proyectos = JSON.parse(fs.readFileSync(proyectosFilePath, "utf-8"));

/* Categorias */
const categoriasFilePath = path.join(__dirname, "../data/categorias.json");
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, "utf-8"));

/* Categorias */
const proyCatFilePath = path.join(__dirname, "../data/proyectoCategoria.json");
const proyCat = JSON.parse(fs.readFileSync(proyCatFilePath, "utf-8"));

module.exports = {
  register: (req, res) => {
    res.render("register");
  },
  registerForm: async (req, res) => {
    try {
      let newUser = {
        id: "1114",
        username: req.body.usuarioNombre,
        name: req.body.name,
        surname: req.body.surname,
        profileURL: `/images/user-images/${req.file.filename}`,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        tipoUsuarioId: "1",
      };
      const usuarito = await db.Usuarios.create(newUser);
      console.log("usuarito", usuarito);
      users.push(newUser);
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        res.locals.userLogged = newUser;
        const jsonTxt = JSON.stringify(users, null, 2);
        fs.writeFileSync(usuariosFilePath, jsonTxt, "utf-8");
        req.session.userLogged = newUser;
        res.render("index", {
          errors: errors.mapped(),
          user: req.session.userLogged,
          listaProyectos: proyectos,
          listaCategorias: categorias,
          noUsuario: "",
          malContrasenia: "",
        });
      } else {
        res.render("register", { errors: errors.mapped(), old: req.body });
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: (req, res) => {
    res.render("login", { noUsuario: "", malContrasenia: "" });
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
      console.log("user", user);
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
            let usuarioTipo;
            usuariosTipo.forEach((element) => {
              if (
                element.idTipoUsuario == req.session.userLogged.fk_tipoUsuario
              ) {
                usuarioTipo = element.nombreTipoUsuario;
              }
            });
            req.session.userLogged.tipoUsuario = usuarioTipo;
            if (req.body.remember == "on") {
              res.cookie("emailUsuario", req.body.email, {
                maxAge: 1000 * 60 * 2,
              });
            }
            res.render("index", {
              user: req.session.userLogged,
              /* tipoUsuario: usuarioTipo, */
              listaProyectos: proyectos,
              listaCategorias: categorias,
              listaProyCat: proyCat,
              noUsuario: "",
              malContrasenia: "",
            });
          } else {
            res.render("login", {
              malContrasenia: "Contraseña incorrecta",
              noUsuario: "",
              old: req.body,
              usuario: "",
              tipoUsuario: "",
            });
          }
        } else {
          res.render("login", {
            errors: errors.mapped(),
            noUsuario: "Usuario no registrado",
            malContrasenia: "",
            old: req.body,
            usuario: "",
            tipoUsuario: "",
          });
        }
      } else {
        res.render("login", {
          errors: errors.mapped(),
          noUsuario: "Usuario no registrado",
          malContrasenia: "",
          old: req.body,
          usuario: "",
          tipoUsuario: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  logout: (req, res) => {
    res.render("register");
  },
  mailbox: (req, res) => {
    const emails = mensajes;
    const listaUsuarios = users;

    res.render("mailbox", {
      emails: emails,
      listaUsuarios: listaUsuarios,
      /*  proyectos: proyects, */
    });
  },
  portfolio: (req, res) => {
    res.render("portfolio");
  },
  config: (req, res) => {
    res.render("config");
  },
  configEditarUsuario: (req, res) => {
    res.render("portfolio");
  },
  configUpdateUsuario: (req, res) => {},
};

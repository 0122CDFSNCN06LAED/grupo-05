const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

/* Mensajes*/
const mensajesFilePath = path.join(__dirname, "../data/mensajes.json");
const mensajes = JSON.parse(fs.readFileSync(mensajesFilePath, "utf-8"));
/* Usuarios */
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

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
  registerBoton: (req, res) => {
    let newUsuario = {
      idUsuario: "1114",
      username: req.body.usuarioNombre,
      name: req.body.name,
      surname: req.body.surname,
      profileURL: `images/fotos-usuarios/${req.body.idUsuario}.png`, //cuando guardemos la imagen el nombre tendría que ser el id de la persona
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      fk_tipoUsuario: "1",
    };
    usuarios.push(newUsuario);
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const jsonTxt = JSON.stringify(usuarios, null, 2);
      fs.writeFileSync(usuariosFilePath, jsonTxt, "utf-8");
      res.render("index", { errors: errors.mapped() });
    } else {
      res.render("register", { errors: errors.mapped(), old: req.body });
    }
  },
  login: (req, res) => {
    res.render("login", { noUsuario: "", malContrasenia: "" });
  },
  loginBoton: (req, res) => {
    //Guardar datos del usuario logueado
    let errors = validationResult(req);
    let usuarioEncontrado;
    usuarios.forEach((element) => {
      if (element.email == req.body.email) {
        usuarioEncontrado = element;
      }
    });
    if (errors.isEmpty()) {
      if (usuarioEncontrado) {
        //verifico contraseña
        let correcto = bcrypt.compareSync(
          req.body.password,
          usuarioEncontrado.password
        );
        console.log("correccctooo", correcto);
        if (correcto == true) {
          req.session.usuarioLogged = usuarioEncontrado;
          //busco el nombre de tipo de usuario para enviarlo al header
          let usuarioTipo;
          usuariosTipo.forEach((element) => {
            if (
              element.idTipoUsuario == req.session.usuarioLogged.fk_tipoUsuario
            ) {
              usuarioTipo = element.nombreTipoUsuario;
            }
          });
          req.session.usuarioLogged.tipoUsuario = usuarioTipo;
          if (req.body.remember == "on") {
            res.cookie("emailUsuario", req.body.email, {
              maxAge: 1000 * 60 * 2,
            });
          }
          res.render("index", {
            usuario: req.session.usuarioLogged,
            /* tipoUsuario: usuarioTipo, */
            listaProyectos: proyectos,
            listaCategorias: categorias,
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
  },
  logout: (req, res) => {
    req.session.destroy();
    console.log("que tal?");
  },
  mailbox: (req, res) => {
    const emails = mensajes;
    const listaUsuarios = usuarios;

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

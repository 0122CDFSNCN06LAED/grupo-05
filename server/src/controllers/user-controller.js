const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

/* Mensajes*/
const mensajesFilePath = path.join(__dirname, "../data/mensajes.json");
const mensajes = JSON.parse(fs.readFileSync(mensajesFilePath, "utf-8"));
/* Usuarios */
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

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
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      res.render("index", { errors: errors.mapped() });
    } else {
      res.render("register", { errors: errors.mapped(), old: req.body });
    }
  },
  login: (req, res) => {
    res.render("login");
  },
  loginBoton: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      res.render("index", { errors: errors.mapped() });
    } else {
      res.render("login", { errors: errors.mapped(), old: req.body });
    }
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

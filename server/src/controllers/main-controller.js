const { validationResult } = require("express-validator");

/* index */

/* falta lo de usuarios --> hacer */
const usuarios = [
  {
    idUsuario: "1111",
    username: "juan97",
    firstName: "Juan",
    lastName: "Guerrero",
    profileURL: "images/fotos-usuarios/1111.png",
    email: "juan@mail.com",
    fk_Nivel: "1112",
  },
  {
    idUsuario: "1112",
    username: "andrea123",
    firstName: "Andrea",
    lastName: "Silva",
    profileURL: "images/fotos-usuarios/1112.png",
    email: "andrea@mail.com",
    fk_Nivel: "1114",
  },
  {
    idUsuario: "1113",
    username: "RicardoMercado",
    firstName: "Ricardo",
    lastName: "Mercado",
    profileURL: "images/fotos-usuarios/1112.png",
    email: "mercado@mail.com",
    fk_Nivel: "1113",
  },
];

const proyects = [
  {
    idProyecto: "1111",
    tituloProyecto: "Mantenimiento web",
    descripcionProyecto: "Se busca persona para mantener una página web",
    precioProyecto: 2000,
    fechaProyecto: "01-02-2022",
  },
  {
    idProyecto: "1112",
    tituloProyecto: "Desarrollador Backend",
    descripcionProyecto:
      "Se busca desarrollador backend para proyecto interesante",
    precioProyecto: 6000,
    fechaProyecto: "16-03-2022",
  },
  {
    idProyecto: "1113",
    tituloProyecto: "Desarrollador Frontend",
    descripcionProyecto:
      "Se busca desarrollador frontend para proyecto interesante",
    precioProyecto: 10000,
    fechaProyecto: "29-02-2022",
  },
  {
    idProyecto: "1114",
    tituloProyecto: "Rebranding logo",
    descripcionProyecto: "Se busca persona para realizar rebranding de logo",
    precioProyecto: 12000,
    fechaProyecto: "01-03-2022",
  },
];

const categorias = [
  {
    idCategoria: "1111",
    nombreCategoria: "Web",
  },
  {
    idCategoria: "1112",
    nombreCategoria: "Base de datos",
  },
  {
    idCategoria: "1113",
    nombreCategoria: "Backend",
  },
  {
    idCategoria: "1114",
    nombreCategoria: "Frontend",
  },
  {
    idCategoria: "1115",
    nombreCategoria: "Desarrollo",
  },
  {
    idCategoria: "1116",
    nombreCategoria: "Diseño",
  },
];

const proyectoCategoria = [
  {
    idProyectoCategoria: "1111",
    fk_Categoria: "1111",
    fk_Proyecto: "1111",
  },
  {
    idProyectoCategoria: "1112",
    fk_Categoria: "1114",
    fk_Proyecto: "1111",
  },
  {
    idProyectoCategoria: "1113",
    fk_Categoria: "1112",
    fk_Proyecto: "1112",
  },
  {
    idProyectoCategoria: "1114",
    fk_Categoria: "1114",
    fk_Proyecto: "1113",
  },
  {
    idProyectoCategoria: "1115",
    fk_Categoria: "1111",
    fk_Proyecto: "1114",
  },
  {
    idProyectoCategoria: "1116",
    fk_Categoria: "1113",
    fk_Proyecto: "1115",
  },
];

/* mensajes */
const mensajes = [
  {
    idMensaje: "1111",
    contenidoMensaje: "Buenos días, cómo te va?",
    fechaMensaje: "20220109",
    fk_Remitente: "1111",
    fk_Destinatario: "1112",
  },
  {
    idMensaje: "1112",
    contenidoMensaje: "Buenos días, te quería consultar por tu servicio",
    fechaMensaje: "20210608",
    fk_Remitente: "1111",
    fk_Destinatario: "1112",
  },
  {
    idMensaje: "1113",
    contenidoMensaje: "Dale mañana coordinamos",
    fechaMensaje: "20210521",
    fk_Remitente: "1111",
    fk_Destinatario: "1112",
  },
  {
    idMensaje: "1114",
    contenidoMensaje: "Eso es lo más alto que podés ofrecer?",
    fechaMensaje: "20220303",
    fk_Remitente: "1112",
    fk_Destinatario: "1111",
  },
  {
    idMensaje: "1115",
    contenidoMensaje: "Excelente, quedamos así",
    fechaMensaje: "20220422",
    fk_Remitente: "1112",
    fk_Destinatario: "1111",
  },
  {
    idMensaje: "1116",
    contenidoMensaje: "Me parece bien lo que se dispone",
    fechaMensaje: "20220101",
    fk_Remitente: "1112",
    fk_Destinatario: "1113",
  },
  {
    idMensaje: "1117",
    contenidoMensaje: "Muy bueno tu trabajo",
    fechaMensaje: "20220505",
    fk_Remitente: "1112",
    fk_Destinatario: "1113",
  },
  {
    idMensaje: "1118",
    contenidoMensaje: "Perfecto!",
    fechaMensaje: "20210224",
    fk_Remitente: "1113",
    fk_Destinatario: "1112",
  },
];

module.exports = {
  index: (req, res) => {
    let proyectos = [];
    for (let i = 0; i < proyects.length; i++) {
      proyectos.push(proyects[i]);
      //categorias de un proyecto en específico
    }
    let cats = [];
    for (let j = 0; j < categorias.length; j++) {
      cats.push(categorias[j]);
    }
    res.render("index", {
      proyectos: proyectos,
      categorias: cats,
      proyectoCategoria: proyectoCategoria,
    });
  },
  register: (req, res) => {
    res.render("register");
  },
  login: (req, res) => {
    res.render("login");
  },
  mailbox: (req, res) => {
    let msj = [];
    for (let i = 0; i < mensajes.length; i++) {
      msj.push(mensajes[i]);
    }
    console.log("msj", msj);
    res.render("mailbox", {
      msj: msj,
      usuarios: usuarios,
      proyectos: proyects,
    });
  },
  portfolio: (req, res) => {
    res.render("portfolio");
  },
  config: (req, res) => {
    res.render("config");
  },
  configEditarUsuario: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error", errors);
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.render("config", { errors: errors.mapped, old: req.body });
    }
    /*  res.render("config"); */
  },
  proposalList: (req, res) => {
    res.render("proposalList");
  },
  biddingDetail: (req, res) => {
    res.render("bidding-detail");
  },
  biddingList: (req, res) => {
    res.render("bidding-list");
  },
  biddingCreation: (req, res) => {
    res.render("bidding-creation");
  },
  biddingEdition: (req, res) => {
    res.render("bidding-edition");
  },
};

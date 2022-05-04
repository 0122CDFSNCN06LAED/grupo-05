const fs = require("fs");
const path = require("path");
/* Proyectos */
const proyectosFilePath = path.join(__dirname, "../data/proyectos.json");
const proyectos = JSON.parse(fs.readFileSync(proyectosFilePath, "utf-8"));

/* Categorias */
const categoriasFilePath = path.join(__dirname, "../data/categorias.json");
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const proyectController = {
  proyectsList: (req, res) => {
    const listaProyectos = proyectos;
    const listaCategorias = categorias;
    res.render("proyects-list", {
      listaProyectos,
      listaCategorias,
    });
  },
  proyectProposals: (req, res) => {
    res.render("proyect-proposals");
  },
  /* detalle específico proyecto */
  detail: (req, res) => {
    const id = req.params.id;
    const proyecto = proyectos.find((p) => id == p.idProyecto);
    res.render("proyect-detail", {
      proyecto: proyecto,
    });
  },
  create: (req, res) => {
    res.render("proyect-creation");
  },

  store: (req, res) => {
    const lastIndex = proyectos.length - 1;
    const lastProyect = proyectos[lastIndex];
    const biggestId = lastProyect.idProyecto ? lastProyect.idProyecto : 0;
    const newId = Number(biggestId) + 1;
    const nombresCategorias = req.body.categoria;
    const arrayCategorias = [];

    nombresCategorias.forEach((nombre) => {
      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].nombreCategoria == nombre) {
          arrayCategorias.push(categorias[i].idCategoria);
        }
      }
    });

    const proyect = {
      ...req.body,
      idProyecto: newId,
      tituloProyecto: req.body.titulo,
      descripcionProyecto: req.body.descripcion,
      categoria: arrayCategorias,
      // imagenProyecto: req.body.titulo,
      categoriaProyecto: null,
      precioProyecto: req.body.precio,
      fechaCreacion: new Date(),
      fechaFinalizacion: null,
      fechaInicio: null,
      developer: null,
      creador: "empresa",
    };
    proyectos.push(proyect);

    const jsonTxt = JSON.stringify(proyectos, null, 2);
    fs.writeFileSync(proyectosFilePath, jsonTxt, "utf-8");

    res.redirect("/proyect");
  },

  edit: (req, res) => {
    const id = req.params.id;
    const proyecto = proyectos.find((p) => id == p.idProyecto);

      res.render("proyect-edition", {
        proyecto: proyecto,
        categorias: categorias,
      });
    },
    /*const id = req.params.id;
    const proyecto = proyectos.find((p) => id == p.idProyecto);
    res.render("proyect-edition", {
      proyecto: proyecto,
    });*/


  update: (req, res) => {
    const id = req.params.id;
    const proyecto = proyectos.find((p) => id == p.idProyecto);
    Object.assign(proyecto, {
      ...req.body,
      tituloProyecto: req.body.titulo,
      descripcionProyecto: req.body.descripcion,
      //categoria: arrayCategorias,
      // imagenProyecto: req.body.titulo,
      categoriaProyecto: null,
      precioProyecto: req.body.precio,
    });
    
    const jsonTxt = JSON.stringify(proyectos, null, 2);
    fs.writeFileSync(proyectosFilePath, jsonTxt, "utf-8");

    res.redirect("/proyect");



    /*const lastIndex = proyectos.length - 1;
    const lastProyect = proyectos[lastIndex];
    const biggestId = lastProyect.idProyecto ? lastProyect.idProyecto : 0;
    const newId = Number(biggestId) + 1;
    const nombresCategorias = req.body.categoria;
    const arrayCategorias = [];

    nombresCategorias.forEach((nombre) => {
      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].nombreCategoria == nombre) {
          arrayCategorias.push(categorias[i].idCategoria);
        }
      }
    });

    const proyect = {
      ...req.body,
      idProyecto: newId,
      tituloProyecto: req.body.titulo,
      descripcionProyecto: req.body.descripcion,
      categoria: arrayCategorias,
      // imagenProyecto: req.body.titulo,
      categoriaProyecto: null,
      precioProyecto: req.body.precio,
      fechaCreacion: new Date(),
      fechaFinalizacion: null,
      fechaInicio: null,
      developer: null,
      creador: "empresa",
    };
    proyectos.push(proyect);

    const jsonTxt = JSON.stringify(proyectos, null, 2);
    fs.writeFileSync(proyectosFilePath, jsonTxt, "utf-8");

    res.redirect("/proyect");*/
  },

  delete: (req, res) => {
    res.render("proyect-edition");
  },
};
module.exports = proyectController;

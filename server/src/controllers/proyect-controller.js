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
    // res.send("HOLA");
    const listaProyectos = proyectos;
    const listaCategorias = categorias;
    res.render("proyects-list", {
      listaProyectos,
      listaCategorias,
    });
  },
  proyectProposals: (req, res) => {
    res.render("proposal-list");
  },
  biddingDetail: (req, res) => {
    res.render("bidding-detail");
  },
  /* detalle específico proyecto */
  detail: (req, res) => {
    const id = req.params.id;

    const proyecto = proyectos.find((p) => id == p.idProyecto);
    res.render("bidding-detail", {
      proyecto: proyecto,
    });
  },
  biddingList: (req, res) => {
    const listaProyectos = proyectos;
    const listaCategorias = categorias;

    res.render("bidding-list", {
      listaProyectos: listaProyectos,
      listaCategorias: listaCategorias,
      proyectoCategoria: proyCat,
    });
  },
  biddingCreation: (req, res) => {
    res.render("bidding-creation");
  },
  biddingEdition: (req, res) => {
    res.render("bidding-edition");
  },
};
module.exports = proyectController;
// store: (req, res) => {
//   res.send(req.body);
//   const lastIndex = proyectos.length - 1;
//   const lastProyecto = proyectos[lastIndex];
//   const biggestId = lastProyecto ? lastProyecto.id : 0;
//   const newId = biggestId + 1;

//   const proyecto = {
//     ...req.body,
//     precioProyecto: Number(req.body.price),
//     tituloProyecto: newTitle,
//     descripcionProyecto: newDescription,
//     categoria: categorias,
//     estado: estado,
//     fechaDeInicio: Date,
//     fechaDeFinalizacion: Date,
//     idProyecto: newId,
//   };

//   proyectos.push(proyecto);

//   const jsonTxt = JSON.stringify(proyectos, null, 2);
//   fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

//   res.redirect("/bidding-list");
// },
// destroy: (req, res) => {
//   res.send("Borré el proyecto: " + req.params.id);
//   const id = req.params.id;
//   const proyectoIndex = proyectos.findIndex((p) => id == p.id);

//   proyectos.splice(proyectoIndex, 1);

//   const jsonTxt = JSON.stringify(proyectos, null, 2);
//   fs.writeFileSync(proyectosFilePath, jsonTxt, "utf-8");

//   res.redirect("/bidding-list");
// },

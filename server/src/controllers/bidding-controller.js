const fs = require("fs");
const path = require("path");
/* Proyectos */
const proyectosFilePath = path.join(__dirname, "../data/proyectos.json");
const proyectos = JSON.parse(fs.readFileSync(proyectosFilePath, "utf-8"));

/* Categorias */
const categoriasFilePath = path.join(__dirname, "../data/categorias.json");
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const biddingController = {
  biddingList: (req, res) => {
    res.render("products", {
      products,
    });
  },
  store: (req, res) => {
    res.send(req.body);
    const lastIndex = proyectos.length - 1;
    const lastProyecto = proyectos[lastIndex];
    const biggestId = lastProyecto ? lastProyecto.id : 0;
    const newId = biggestId + 1;

    const proyecto = {
      ...req.body,
      precioProyecto: Number(req.body.price),
      tituloProyecto: newTitle,
      descripcionProyecto: newDescription,
      categoria: categorias,
      estado: estado,
      fechaDeInicio: Date,
      fechaDeFinalizacion: Date,
      idProyecto: newId,
    };

    proyectos.push(proyecto);

    const jsonTxt = JSON.stringify(proyectos, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/bidding-list");
  },
  destroy: (req, res) => {
    res.send("Borré el proyecto: " + req.params.id);
    const id = req.params.id;
    const proyectoIndex = proyectos.findIndex((p) => id == p.id);

    proyectos.splice(proyectoIndex, 1);

    const jsonTxt = JSON.stringify(proyectos, null, 2);
    fs.writeFileSync(proyectosFilePath, jsonTxt, "utf-8");

    res.redirect("/bidding-list");
  },
};
module.exports = biddingController;

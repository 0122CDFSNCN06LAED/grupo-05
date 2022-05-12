const fs = require("fs");
const path = require("path");

/* Proyectos */
const proyectosFilePath = path.join(__dirname, "../data/proyectos.json");
const proyectos = JSON.parse(fs.readFileSync(proyectosFilePath, "utf-8"));

/* Categorias */
const categoriasFilePath = path.join(__dirname, "../data/categorias.json");
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, "utf-8"));

module.exports = {
  index: (req, res) => {
    const listaProyectos = proyectos;
    const listaCategorias = categorias;

    res.render("index", {
      listaProyectos: listaProyectos,
      listaCategorias: listaCategorias,
      /* proyectoCategoria: proyCat, */
    });
  },
};

const fs = require("fs");
const path = require("path");
const db = require("../../database/models");

/* Proyectos */
const proyectosFilePath = path.join(__dirname, "../data/proyectos.json");

/* Categorias */
const categoriasFilePath = path.join(__dirname, "../data/categorias.json");
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, "utf-8"));

module.exports = {
  index: async (req, res) => {
    try {
      const proyectos = await db.Proyectos.findAll();
      console.log(proyectos, "proyectos");
      const categorias = await db.Categorias.findAll();
      console.log(categorias, "categorias");
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      console.log(proyectoCategoria, "proyectoCategoria");

      res.render("index", {
        listaProyectos: proyectos,
        listaCategorias: categorias,
        listaProyCat: proyectoCategoria,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

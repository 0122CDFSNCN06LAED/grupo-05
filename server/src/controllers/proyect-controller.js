const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../../database/models");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

/* Proyectos */
const proyectosFilePath = path.join(__dirname, "../data/proyectos.json");
const proyectos = JSON.parse(fs.readFileSync(proyectosFilePath, "utf-8"));

/* Categorias */
const categoriasFilePath = path.join(__dirname, "../data/categorias.json");
const categorias = JSON.parse(fs.readFileSync(categoriasFilePath, "utf-8"));

const proyectController = {
  proyectsList: async (req, res) => {
    try {
      const proyectos = await db.Proyectos.findAll();
      console.log(proyectos, "proyectos");
      /* acá hay que cambiar cosas, ya que antes no existía proyectosCategorias */
      const categorias = await db.Categorias.findAll();
      console.log(categorias, "categorias");
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      console.log(proyectoCategoria, "proyectoCategoria");
      /* const listaProyectos = proyectos;
      const listaCategorias = categorias; */
      res.render("proyects-list", {
        listaProyectos: proyectos,
        listaCategorias: categorias,
        listaProyCat: proyectoCategoria,
      });
    } catch (error) {
      console.log(error);
    }
  },
  proyectProposals: async (req, res) => {
    try {
      /* Esta pantalla no es dinámica, habría que arreglarla */
      res.render("proyect-proposals");
    } catch (error) {
      console.log(error);
    }
  },
  /* detalle específico proyecto */
  detail: async (req, res) => {
    try {
      /* Esta pantalla no es dinámica, habría que arreglarla */
      const idParam = req.params.id;
      const proyecto = await db.Proyectos.findOne({
        where: {
          id: idParam,
        },
      });
      res.render("proyect-detail", {
        proyecto: proyecto,
      });
    } catch (error) {
      console.log(error);
    }
  },

  create: (req, res) => {
    res.render("proyect-creation");
  },

  store: async (req, res) => {
    try {
      const proyect = {
        ...req.body,
        id: uuidv1(),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagenProyecto: "" /* req.body.titulo */ /* Ver si queda o se saca */,
        precio: req.body.precio,
        fechaCreacion: new Date(),
        fechaFinalizacion: null,
        fechaInicio: null,
        developer: null,
        estadoId: 1,
        creador: req.session.userLogged.id,
      };
      await db.Proyectos.create(proyect);

      const categorias = req.body.categoria;
      for (let i = 0; i < categorias.length; i++) {
        console.log("qqq", categorias[i]);
        const categoria = await db.Categorias.findOne({
          where: {
            nombre: categorias[i],
          },
        });

        const proyCat = {
          id: uuidv1(),
          categoriaId: categoria.id,
          proyectoId: proyect.id,
        };
        await db.ProyectoCategoria.create(proyCat);
      }

      let errors = validationResult(req);
      if (errors.isEmpty()) {
        res.render("proyects-list", { errors: errors.mapped() });
      } else {
        res.render("proyect-creation", {
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const proyecto = proyectos.find((p) => id == p.idProyecto);
      console.log("p", proyecto, "c", categorias);
      const idParam = req.params.id;
      /* const proyecto = await db.Proyectos.findOne({
        where: {
          id: idParam,
        },
      });
      const categorias = await db.Categorias.findAll(); */
      res.render("proyect-edition", {
        proyecto: proyecto,
        categorias: categorias,
      });
    } catch (error) {
      console.log(error);
    }
  },
  /*const id = req.params.id;
    const proyecto = proyectos.find((p) => id == p.idProyecto);
    res.render("proyect-edition", {
      proyecto: proyecto,
    });*/

  update: async (req, res) => {
    try {
      const idParam = req.params.id;
      await db.Proyectos.update(
        {
          titulo: req.body.titulo,
          descripcion: req.body.descripcion,
          precio: req.body.precio,
        },
        {
          where: {
            id: idParam,
          },
        }
      );

      //borro las instancias de proyectoCategoria de este proyecto para asignar las nuevas
      const proyectosCategorias = await db.ProyectoCategoria.findAll({
        where: {
          proyectoId: idParam,
        },
      });
      for (let i = 0; i < proyectosCategorias.length; i++) {
        db.ProyectoCategoria.destroy({
          where: {
            id: proyectosCategorias[i].id,
          },
        });
      }

      //creo las instancias de proyectoCategorias y las asocio al proyecto y la categoría correspondiente
      let cats = [];
      cats.push(req.body.categoria);
      console.log("catsss", cats.length, req.body.categoria);
      for (let i = 0; i < cats.length; i++) {
        console.log("helloooo");
        //busco el id de la categoria
        const categ = await db.Categorias.findOne({
          where: {
            nombre: cats[i],
          },
        });
        console.log("categggg", categ);
        let py = {
          id: uuidv1(),
          categoriaId: categ.id,
          proyectoId: idParam,
        };
        db.ProyectoCategoria.create(py);
      }

      let errors = validationResult(req);
      if (errors.isEmpty()) {
        res.render("proyects-list", { errors: errors.mapped() });
      } else {
        res.render("proyect-edition", {
          errors: errors.mapped(),
          old: req.body,
          proyecto: proyecto,
          categorias: categorias,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      /* Hay que arreglar el botón, con js llamar a este método :) */
      const idParam = req.params.id;
      db.Proyectos.destroy({
        where: {
          id: idParam,
        },
      });

      res.redirect("/proyect");
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = proyectController;

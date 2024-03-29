const { validationResult } = require('express-validator');
const db = require('../../database/models');

const proyectController = {
  proyectsList: async (req, res) => {
    try {
      const proyectos = await db.Proyectos.findAll();
      const categorias = await db.Categorias.findAll();
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      /* const listaProyectos = proyectos;
      const listaCategorias = categorias; */
      res.render('proyects-list', {
        listaProyectos: proyectos,
        listaCategorias: categorias,
        listaProyCat: proyectoCategoria,
      });
    } catch (error) {
      console.log(error);
    }
  },
  proyectosAll: async (req, res) => {
    try {
      const proyectos = await db.Proyectos.findAll();
      const categorias = await db.Categorias.findAll();
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      /* const listaProyectos = proyectos;
      const listaCategorias = categorias; */
      res.render('proyect-proposals', {
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
      let proyectos = [];
      const categorias = await db.Categorias.findAll();
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      if (req.session.userLogged.tipoUsuarioId == 2) {
        //busco si es freelancer
        const proyectoUsuario = await db.ProyectoUsuario.findAll({
          where: {
            postulanteId: req.session.userLogged.id,
          },
        });
        for (let i = 0; i < proyectoUsuario.length; i++) {
          const proy = await db.Proyectos.findOne({
            where: {
              id: proyectoUsuario[i].proyectoId,
            },
          });
          proyectos.push(proy);
        }
      } else if (req.session.userLogged.tipoUsuarioId == 1) {
        //busco si es empresa
        const proyectoCreador = await db.Proyectos.findAll({
          where: {
            creadorId: req.session.userLogged.id,
          },
        });
        proyectos = proyectoCreador;
      } else if (req.session.userLogged.tipoUsuarioId == 3) {
        proyectos = await db.Proyectos.findAll();
      }
      res.render('proyects-list', {
        listaProyectos: proyectos,
        listaCategorias: categorias,
        listaProyCat: proyectoCategoria,
      });
    } catch (error) {
      console.log(error);
    }
  },
  proposalsList: async (req, res) => {
    try {
      let proyectos = [];
      const categorias = await db.Categorias.findAll();
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      if (req.session.userLogged.tipoUsuarioId == 2) {
        //busco si es freelancer
        const proyectoUsuario = await db.ProyectoUsuario.findAll({
          where: {
            postulanteId: req.session.userLogged.id,
          },
        });
        for (let i = 0; i < proyectoUsuario.length; i++) {
          const proy = await db.Proyectos.findOne({
            where: {
              id: proyectoUsuario[i].proyectoId,
            },
          });
          proyectos.push(proy);
        }
      } else if (req.session.userLogged.tipoUsuarioId == 1) {
        //busco si es empresa
        const proyectoCreador = await db.Proyectos.findAll({
          where: {
            creadorId: req.session.userLogged.id,
          },
        });
        proyectos = proyectoCreador;
      } else if (req.session.userLogged.tipoUsuarioId == 3) {
        proyectos = await db.Proyectos.findAll();
      }
      res.render('proyects-list', {
        listaProyectos: proyectos,
        listaCategorias: categorias,
        listaProyCat: proyectoCategoria,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // async postular(req, res) {
  //       const proyecto = await db.Proyectos.findByPk(req.params.id);
  //       const pro = req.body.categoria;
  //     for (let i = 0; i < categorias.length; i++) {
  //       const categoria = await db.Categorias.findOne({
  //         where: {
  //           id: categorias[i],
  //         },
  //       });
  //       const proyCat = {
  //         id: '',
  //         categoriaId: categoria.id,
  //         proyectoId: proyectoUltimo.id,
  //       };
  //       await db.ProyectoCategoria.create(proyCat);
  //       if (!req.session.cart[product.id]) {
  //           req.session.cart[product.id] = {
  //               id: product.id,
  //               name: product.name,
  //               image: product.image,
  //               price: Number(
  //                   (product.price - product.price * (product.discount / 100)).toFixed(2)
  //               ),
  //               count: 0,
  //           };
  //       }
  //       req.session.cart[product.id].count++;

  //       res.redirect("back");
  //   },

  /* detalle específico proyecto */
  detail: async (req, res) => {
    try {
      const idParam = req.params.id;
      const proyecto = await db.Proyectos.findOne({
        where: {
          id: idParam,
        },
      });
      let proyUsuExistente = await db.ProyectoUsuario.findOne({
        where: {
          postulanteId: res.locals.userLogged.id,
          proyectoId: proyecto.id
        }
      })
      if (proyUsuExistente) {
        let postulado = true
        res.render('proyect-detail', {
          proyecto: proyecto,
          postulado: postulado
        });
      } else {
        let postulado = false
        res.render('proyect-detail', {
          proyecto: proyecto,
          postulado: postulado
        });
      }

    } catch (error) {
      console.log(error);
    }
  },
  desp: async (req, res) => {
    try {
      const idParam = req.params.id;
      const proyecto = await db.Proyectos.findOne({
        where: {
          id: idParam,
        },
      });
      console.log('hhhhhhhhhhhhhhh', idParam)
      await db.ProyectoUsuario.destroy({
        where: {
          postulanteId: res.locals.userLogged.id,
          proyectoId: idParam
        }
      })
      let postulado = false
      res.render('index', {
        proyecto: proyecto,
        postulado: postulado
      });

    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    try {
      const categorias = await db.Categorias.findAll();
      res.render('proyect-creation', { listaCategorias: categorias });
    } catch (error) {
      res.render('proyect-creation');
    }
  },

  store: async (req, res) => {
    try {
      const proyect = {
        ...req.body,
        id: '',
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        fechaCreacion: new Date(),
        fechaFinalizacion: null,
        fechaInicio: null,
        developer: null,
        estadoId: 1,
        creadorId: req.session.userLogged.id,
      };
      await db.Proyectos.create(proyect);

      //cuando creo automáticamente no se carga el id (no sé cual es el motivo) por lo que no puedo crear el proycat, por eso realizo la siguiente búsqueda
      const totalProyectos = await db.Proyectos.findAll();
      console.log();
      let proyectoUltimo = totalProyectos[0];
      totalProyectos.forEach((p) => {
        if (p.id > proyectoUltimo.id) {
          proyectoUltimo = p;
        }
      });
      const categorias = req.body.categoria;
      for (let i = 0; i < categorias.length; i++) {
        const categoria = await db.Categorias.findOne({
          where: {
            id: categorias[i],
          },
        });
        const proyCat = {
          id: '',
          categoriaId: categoria.id,
          proyectoId: proyectoUltimo.id,
        };
        await db.ProyectoCategoria.create(proyCat);
      }
      let errors = validationResult(req);
      const listaProyectos = await db.Proyectos.findAll();
      const listaCategorias = await db.Categorias.findAll();
      const listaProyectoCategoria = await db.ProyectoCategoria.findAll();
      if (errors.isEmpty()) {
        res.render('proyects-list', {
          errors: errors.mapped(),
          listaProyectos: listaProyectos,
          listaCategorias: listaCategorias,
          listaProyCat: listaProyectoCategoria,
        });
      } else {
        res.render('proyect-creation', {
          errors: errors.mapped(),
          old: req.body,
          listaProyectos: listaProyectos,
          listaCategorias: listaCategorias,
          listaProyCat: listaProyectoCategoria,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  edit: async (req, res) => {
    try {
      const proyectos = await db.Proyectos.findAll();
      const categorias = await db.Categorias.findAll();
      const proyectoCategoria = await db.ProyectoCategoria.findAll();
      const idParam = req.params.id;
      const proyecto = await db.Proyectos.findOne({
        where: {
          id: idParam,
        },
      });
      res.render('proyect-edition', {
        proyecto: proyecto,
        categorias: categorias,
        proyectos: proyectos,
        proyectoCategoria: proyectoCategoria,
      });
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const idParam = req.params.id;
      const proyecto = await db.Proyectos.findOne({
        where: {
          id: idParam,
        },
      });
      //primero borro todos los proyectoCategoria

      const proyectosCat = await db.ProyectoCategoria.findAll({
        where: {
          proyectoId: idParam,
        },
      });
      for (let i = 0; i < proyectosCat.length; i++) {
        db.ProyectoCategoria.destroy({
          where: {
            id: proyectosCat[i].id,
          },
        });
      }
      db.Proyectos.destroy({
        where: {
          id: idParam,
        },
      });

      res.render('proyect-delete', {
        proyecto: proyecto,
      });
    } catch (error) {
      console.log(error);
    }
  },

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
      for (let i = 0; i < cats.length; i++) {
        //busco el id de la categoria
        const categ = await db.Categorias.findOne({
          where: {
            nombre: cats[i],
          },
        });
        let py = {
          categoriaId: categ.id,
          proyectoId: idParam,
        };
        db.ProyectoCategoria.create(py);
      }

      let errors = validationResult(req);
      if (errors.isEmpty()) {
        res.render('proyects-list', { errors: errors.mapped() });
      } else {
        res.render('proyect-edition', {
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
  postular: async (req, res) => {
    try {
      const idParam = req.params.id;
      const proyecto = await db.Proyectos.findOne({
        where: {
          id: idParam,
        },
      });
      let proyUsu = {
        id: '',
        postulanteId: res.locals.userLogged.id,
        proyectoId: idParam,
      };
      db.ProyectoUsuario.create(proyUsu)
      let postulado = true
      res.render('proyect-detail', {
        proyecto: proyecto,
        postulado: postulado
      });
    } catch (error) {
      console.log(error);
    }
  },

  // delete: async (req, res) => {
  //   try {
  //     /* Hay que arreglar el botón, con js llamar a este método :) */
  //     const idParam = req.params.id;
  //     db.Proyectos.destroy({
  //       where: {
  //         id: idParam,
  //       },
  //     });

  //     res.redirect('/proyect');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
module.exports = proyectController;

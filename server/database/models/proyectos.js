const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "Proyectos";
  const columns = {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    titulo: dataTypes.STRING,
    descripcion: dataTypes.STRING,
    imagenProyecto: dataTypes.STRING,
    precio: dataTypes.INTEGER,
    fechaCreacion: dataTypes.DATE,
    fechaInicio: dataTypes.DATE,
    fechaFinalizacion: dataTypes.DATE,
    developer: dataTypes.STRING,
  };

  const config = {
    tableName: "proyectos",
    timestamps: false,
  };

  const Proyectos = sequelize.define(alias, columns, config);

  // relaciones

  Proyectos.associate = (models) => {
    Proyectos.hasMany(models.Estados, {
      as: "estadoId",
      foreignKey: "estadoId",
    });
    Proyectos.hasMany(models.Usuarios, {
      as: "creadorP",
      foreignKey: "creador",
    });
    Proyectos.hasMany(models.ProyectoCategoria, {
      as: "categorias",
      foreignKey: "proyectoId",
    });
    Proyectos.hasMany(models.ProyectoUsuario, {
      as: "postulaciones",
      foreignKey: "proyectoId",
    });
  };

  return Proyectos;
};

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
    Proyectos.belongsTo(models.Estados, {
      as: "estado",
      foreignKey: "estadoId",
    });
    Proyectos.belongsTo(models.Usuarios, {
      as: "creadorP",
      foreignKey: "creador",
    });
    Proyectos.hasMany(models.ProyectoCategoria, {
      as: "proyecto",
      foreignKey: "proyectoId",
    });
  };

  return Proyectos;
};

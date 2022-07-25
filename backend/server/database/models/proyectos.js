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
    precio: dataTypes.INTEGER,
    fechaCreacion: dataTypes.DATE,
    fechaInicio: dataTypes.DATE,
    fechaFinalizacion: dataTypes.DATE,
    creadorId: dataTypes.STRING,
    descripcionDetallada: dataTypes.STRING,
  };

  const config = {
    tableName: "proyectos",
    timestamps: false,
  };

  const Proyectos = sequelize.define(alias, columns, config);

  // relaciones

  Proyectos.associate = (models) => {
    Proyectos.belongsTo(models.Estados, {
      as: "estadoid",
      foreignKey: "estadoId",
    });
    Proyectos.belongsTo(models.Usuarios, {
      as: "creadorid",
      foreignKey: "creadorId",
    });
    Proyectos.hasMany(models.ProyectoCategoria, {
      as: "proyectoid",
      foreignKey: "proyectoId",
    });
    Proyectos.hasMany(models.ProyectoUsuario, {
      as: "proyectoidU",
      foreignKey: "proyectoId",
    });
  };

  return Proyectos;
};

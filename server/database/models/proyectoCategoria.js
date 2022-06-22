const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "ProyectoCategoria";
  const columns = {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  };

  const config = {
    tableName: "proyectocategoria",
    timestamps: false,
  };

  const ProyectoCategoria = sequelize.define(alias, columns, config);

  // relaciones

  ProyectoCategoria.associate = (models) => {
    ProyectoCategoria.belongsTo(models.categorias, {
      as: "categoria",
      foreignKey: "categoriaId",
    });
    ProyectoCategoria.belongsTo(models.proyectos, {
      as: "proyecto",
      foreignKey: "proyectoId",
    });
  };

  return ProyectoCategoria;
};

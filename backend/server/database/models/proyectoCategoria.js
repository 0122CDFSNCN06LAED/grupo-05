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
    ProyectoCategoria.belongsTo(models.Categorias, {
      as: "categoriaid",
      foreignKey: "categoriaId",
    });
    ProyectoCategoria.belongsTo(models.Proyectos, {
      as: "proyectoid",
      foreignKey: "proyectoId",
    });
  };

  return ProyectoCategoria;
};

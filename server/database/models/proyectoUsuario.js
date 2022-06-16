const Sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  const alias = "ProyectoUsuario";
  const columns = {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  };

  const config = {
    tableName: "proyectousuario",
    timestamps: false,
  };

  const ProyectoUsuario = sequelize.define(alias, columns, config);

  // relaciones

  ProyectoUsuario.associate = (models) => {
    ProyectoUsuario.belongsTo(models.Usuarios, {
      as: "postulante",
      foreignKey: "postulanteId",
    });
    ProyectoUsuario.belongsTo(models.Proyectos, {
      as: "proyecto",
      foreignKey: "proyectoId",
    });
  };

  return ProyectoUsuario;
};

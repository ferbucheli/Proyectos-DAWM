const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productocarro', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orden',
        key: 'id'
      }
    },
    producto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'producto',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'productocarro',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_orden",
        using: "BTREE",
        fields: [
          { name: "orden" },
        ]
      },
      {
        name: "fk_producto",
        using: "BTREE",
        fields: [
          { name: "producto" },
        ]
      },
    ]
  });
};

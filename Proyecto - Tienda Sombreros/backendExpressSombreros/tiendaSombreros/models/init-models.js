var DataTypes = require("sequelize").DataTypes;
var _orden = require("./orden");
var _producto = require("./producto");
var _productocarro = require("./productocarro");

function initModels(sequelize) {
  var orden = _orden(sequelize, DataTypes);
  var producto = _producto(sequelize, DataTypes);
  var productocarro = _productocarro(sequelize, DataTypes);

  productocarro.belongsTo(orden, { as: "orden_orden", foreignKey: "orden"});
  orden.hasOne(productocarro, { as: "productocarro", foreignKey: "orden"});
  productocarro.belongsTo(producto, { as: "producto_producto", foreignKey: "producto"});
  producto.hasOne(productocarro, { as: "productocarro", foreignKey: "producto"});

  return {
    orden,
    producto,
    productocarro,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

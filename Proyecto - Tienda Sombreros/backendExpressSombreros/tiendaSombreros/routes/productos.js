var express = require('express');
var router = express.Router();
const { Sequelize, Op } = require('sequelize');
const Producto = require('../models').producto;  

/* GET users listing. */

// Obtener Todos los Productos
router.get('/', function(req, res, next) {  
    Producto.findAll({
      })
      .then(productos => {  
          res.json( productos );  
      })  
      .catch(error => res.status(400).send(error))
});

// Obtener 1 producto por ID
router.get('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    Producto.findOne({
      where: { 
        id: id
      }
    })
    .then(productos => {  
        res.json( productos );  
    })  
    .catch(error => res.status(400).send(error))
})
  

module.exports = router;
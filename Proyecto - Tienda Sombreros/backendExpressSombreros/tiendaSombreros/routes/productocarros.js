var express = require('express');
var router = express.Router();
const { Sequelize, Op } = require('sequelize');
const Productocarros = require('../models').productocarro;  

/* GET users listing. */

// Obtener Todos los Productos dentro del carro
router.get('/', function(req, res, next) {  
    Productocarros.findAll({
      })
      .then(productos => {  
          res.json( productos );  
      })  
      .catch(error => res.status(400).send(error))
});

router.post('/', function(req, res, next) {
    Productocarros.create({
        cantidad: Number(req.body.cantidad),
        orden: parseInt(req.body.orden),
        producto: parseInt(req.body.producto)
      })
      .then(prod => {
        res.send(prod);
    })
    .catch(error => res.status(400).send(error))
});

module.exports = router;
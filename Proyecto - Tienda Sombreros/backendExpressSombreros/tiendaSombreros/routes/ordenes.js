const { application } = require('express');
var express = require('express');
var router = express.Router();
const { Sequelize, Op } = require('sequelize');

const Ordenes = require('../models').orden; 
/* GET users listing. */

// Obtener Todos los Productos dentro del carro
router.get('/', function(req, res, next) {  
    Ordenes.findAll({
      })
      .then(productos => {  
          res.json( productos );  
      })  
      .catch(error => res.status(400).send(error))
});

// agregar una orden

router.post('/', function(req, res, next) {
    Ordenes.create({
        total: Number(req.body.total),
        fecha: new Date(),
        id_cliente: parseInt(req.body.id_cliente)
      })
      .then(orden => {
        res.send(orden);
    })
    .catch(error => res.status(400).send(error))
});

module.exports = router;
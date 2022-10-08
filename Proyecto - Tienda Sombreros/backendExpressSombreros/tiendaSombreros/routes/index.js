var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);  
const { Sequelize, Op } = require('sequelize');
const Producto = require('../models').producto;   

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/docs', (req, res, next) => {
  res.render('docs', { title: 'Documentation' })
})


module.exports = router;

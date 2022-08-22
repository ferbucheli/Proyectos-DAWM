'use strict';

let modelos = ['Victoria Fedora', 'Josie Fedora', 'Scrunchie', 'Amelia', 'Kristy Fedora', 'Sedona Fedora', 'Charlie', 'Sidney', 'Sanibel', 'Catalina', 'Caroline Fedora', 'Sausalito', 'Diva', 'Romina Fedora', 'Carolina', 'London', 'Fender', 'Hikaru', 'Vegas', 'Sunny', 'Popsy', 'Betty', 'Boop', 'Waverly', 'Hill', 'Rose', 'Rosemary', 'Jazzmin', 'Tulip', 'Lavender', 'Orquid', 'Lilac', 'Flower', 'Paris', 'Quinta', 'Cowboy Fedora', 'Cactus', 'Desert', 'Sun', 'Sunflower', 'Moon', 'Light', 'Olivander', 'Olivia Fedora', 'Gandalf', 'Off White', 'Gucci', 'Floyd', 'Waves', 'Wavy', 'Rapunzel', 'Apple Fedora'] 
let tipos = ['Playero', 'Vaquero', 'Casual']

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i < modelos.length; i++) {  
      await queryInterface.bulkInsert('Producto', [{  
        descripcion : tipos[Math.floor(Math.random() * 3)],
        modelo: modelos[i],
        precio: 15 + (i/2)
      }], {});  
   } 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Producto', null, {});  
  }
};
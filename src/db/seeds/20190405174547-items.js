'use strict';
const faker = require("faker");

//#2
 let items = [];

 for(let i = 1 ; i <= 15 ; i++){
   items.push({
     title: faker.hacker.noun(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert("Items", items, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Items", null, {});


   
  }
};

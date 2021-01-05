module.exports = app => {

  var router = require("express").Router();

  const categories = require("../controllers/systemparaController.js");

  // Create a new Tutorial
  router.post("/systempara", categories.create);
  
  // Retrieve all products
  router.get("/systempara", categories.findAll);

  // Retrieve a single Tutorial with id
  router.get("/systempara/:id", categories.findOne);

  // Update a Tutorial with id
  // router.put("/systempara/:id", categories.update);
  
  // Delete a Tutorial with id
  // router.delete("/systempara/:id", categories.delete);
 
  app.use('/api', router);
};

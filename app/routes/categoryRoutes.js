module.exports = app => {

  var router = require("express").Router();

  const categories = require("../controllers/categoryController.js");

  // Create a new Tutorial
  router.post("/categories", categories.create);
  
  // Retrieve all products
  router.get("/categories", categories.findAll);

  // Retrieve all Master products
  router.get("/categoriesmaster", categories.findMaster);

  // Retrieve all NOT Master products
  router.get("/categoriesnotmaster", categories.findNotMaster);

  // Retrieve a single Tutorial with id
  router.get("/categories/:categories_id", categories.findOne);

  // Update a Tutorial with id
  // router.put("/categories/:categories_id", categories.update);
  
  // Delete a Tutorial with id
  // router.delete("/categories/:categories_id", categories.delete);
 
  app.use('/api', router);
};

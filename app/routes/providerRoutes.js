module.exports = app => {

  var router = require("express").Router();

  const providers = require("../controllers/providerController.js");

  // Create a new Tutorial
  // router.post("/providers", providers.create);
  
  // Retrieve all products
  router.get("/providers", providers.findAll);

  // Retrieve all Master products
  router.get("/providersmaster", providers.findMaster);

  // Retrieve all NOT Master products
  router.get("/providersnotmaster", providers.findNotMaster);

  // Retrieve a single Tutorial with id
  router.get("/providers/:providers_id", providers.findOne);

  // Update a Tutorial with id
  // router.put("/providers/:providers_id", providers.update);
  
  // Delete a Tutorial with id
  // router.delete("/providers/:providers_id", providers.delete);
 
  app.use('/api', router);
};

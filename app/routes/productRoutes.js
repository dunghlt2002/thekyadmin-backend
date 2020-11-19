module.exports = app => {

  var router = require("express").Router();

  const products = require("../controllers/productController.js");

  // Create a new Tutorial
  router.post("/products", products.create);
  // Retrieve all products
  router.get("/products", products.findAll);
  // Retrieve all products limit per page
  router.get("/productsperpage/:currentPage", products.findAndCountAll);

  // Retrieve all products by ABC limit per page, khong xai, xai chung voi findAndCountAll
  // router.get("/productsABCperpage/:currentPage", products.findABCAndCountAll);

  // Retrieve a single Tutorial with id
  router.get("/products/:products_id", products.findOne);
  // Update a Tutorial with id
  router.put("/products/:products_id", products.update);
  // Delete a Tutorial with id
  router.delete("/products/:products_id", products.delete);
  // Delete all
  // router.delete("/", products.deleteAll);
  // Retrieve all published products
  // router.get("/published", products.findAllPublished);
  // Delete all
  // router.delete("/", products.deleteAll);

  
  app.use('/api', router);
  // app.use('/api/products', router);
};

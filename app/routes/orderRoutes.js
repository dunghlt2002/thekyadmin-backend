module.exports = app => {

    var router = require("express").Router();
  
    const orders = require("../controllers/orderController.js");
  

    // Retrieve all
    router.get("/orders", orders.findAll);

    // Retrieve a single
    router.get("/orders/:orders_id", orders.findOne);

    // Create a new  - tao ben phan customer GUI
    // router.post("/orders", orders.create);
    
    //Update with id - update ben phan customer GUI
    router.put("/orders/:orders_id", orders.update);

    // Delete  with id
    // router.delete("/products/:orders_id", orders.delete);
    // Delete all
    // router.delete("/", products.deleteAll);
    // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    
    app.use('/api', router);

  };
  
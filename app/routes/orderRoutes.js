module.exports = app => {

    var router = require("express").Router();
  
    const orders = require("../controllers/orderController.js");
  

    // Retrieve all
    router.get("/orders", orders.findAll);

    // Retrieve all by customerID
    router.get("/ordersbycustomer/:customer_id", orders.findAllByCustomer);
    
    // Retrieve a single
    router.get("/orders/:orders_id", orders.findOne);

    // Create a new 12/18/2020
    router.post("/orders", orders.create);
    
    //Update with id - update ben phan customer GUI
    router.put("/orders/:orders_id", orders.update);

    //Update with id - update ben phan customer GUI
    // lieu co can phan updatepay nay khong ta 12/24/2020
    router.put("/orderpay/:orders_id", orders.updatepay);


    // Delete  with id
    router.delete("/orders/:orders_id", orders.delete);

    // Delete all
    // router.delete("/", products.deleteAll);
    // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    
    app.use('/api', router);

  };
  
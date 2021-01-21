module.exports = app => {

    var router = require("express").Router();
  
    const orders = require("../controllers/orderController.js");

    const { authJwt } = require("../middleware");
    const utils = require('../utils');

      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });


    // Retrieve all
    // router.get("/orders", orders.findAll);
    router.get("/orders/:status", [authJwt.verifyToken], orders.findAll);

    // Retrieve all by customerID
    router.get("/ordersbycustomer/:customer_id_status", [authJwt.verifyToken], orders.findAllByCustomer);
    
    // Retrieve a single (order khong co chu S phia sau)
    router.get("/order/:orders_id", [authJwt.verifyToken], orders.findOne);

    // Create a new 12/18/2020
    // router.get("/customers/:currentPage", [authJwt.verifyToken], customers.findAndCountAll);
    router.post("/orders", [authJwt.verifyToken], orders.create);
    
    //Update with id - update ben phan customer GUI
    router.put("/orders/:orders_id", [authJwt.verifyToken], orders.update);

    //Update with id - update ben phan customer GUI
    // lieu co can phan updatepay nay khong ta 12/24/2020
    router.put("/orderpay/:orders_id", [authJwt.verifyToken], orders.updatepay);


    // Delete  with id
    router.delete("/orders/:orders_id", [authJwt.verifyToken], orders.delete);

    // Delete all
    // router.delete("/", products.deleteAll);
    // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    
    app.use('/api', router);

  };
  
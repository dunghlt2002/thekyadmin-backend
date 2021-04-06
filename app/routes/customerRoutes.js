module.exports = app => {

    var router = require("express").Router();
  
    const customers = require("../controllers/customerController.js");

    const { authJwt } = require("../middleware");
    const utils = require('../utils');

      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    // Customer user Signin
    router.post("/customersignin", customers.signin);
  
    // Create a new Tutorial
    router.post("/customers", customers.create);

    // Retrieve all customers
    router.get("/customers", customers.findAll);

    // Retrieve all customers paginition
    // router.get("/users/:currentPage", [authJwt.verifyToken], users.findAndCountAll);
    // router.get("/customers/:currentPage", customers.findAndCountAll);
    router.get("/customers/:currentPage", [authJwt.verifyToken], customers.findAndCountAll);

    // Retrieve a single Customer with id
    router.get("/customer/:customers_id", customers.findOne);

    // Retrieve a single Customer with email
    router.get("/customerbyemail/:customers_email", customers.findOneByEmail);

    // customers_passwordtoken
    router.get("/resetpasswordrequest/:customers_email", customers.resetPasswordRequest);

    // Update a Tutorial with id
    router.put("/customers/:customers_id", customers.update);

    // Delete a Tutorial with id
    router.delete("/customers/:customers_id", customers.delete);

    // Delete all
    // router.delete("/", customers.deleteAll);
    // Retrieve all published customers
    // router.get("/published", customers.findAllPublished);
    // Delete all
    // router.delete("/", customers.deleteAll);
  
    app.use('/api', router);
    // app.use('/api/customers', router);
  };
  
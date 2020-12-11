module.exports = app => {

  var router = require("express").Router();

  const us_states = require("../controllers/us_statesController.js");

  // Create a new Tutorial
  router.post("/us_states", us_states.create);
  
  // Retrieve all products
  router.get("/us_states", us_states.findAll);

  // Retrieve a single Tutorial with id
  router.get("/us_states/:us_state_id", us_states.findOne);

  app.use('/api', router);
};

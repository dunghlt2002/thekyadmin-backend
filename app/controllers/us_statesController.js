const db = require("../models");
const Us_states = db.us_states;
const Op = db.Sequelize.Op;

// Create and Save a new Us_states
exports.create = (req, res) => {
  // Validate request
  if (!req.body.us_states_name) {
    res.status(400).send({
      message: "Us_states name can not be empty!"
    });
    return;
  }

  // Create a Us_states
  const Us_states = {
    us_states_symbol: req.body.us_states_symbol
  };

  // Save Us_states in the database
  Us_states.create(Us_states)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Us_states."
      });
    });
};

// Retrieve all us_states from the database.
exports.findAll = (req, res) => {
  console.log('hihihi we are here in USStates search');
  
  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {us_state_symbol: { [Op.like]: `%${search_keyword}%`} }, 
      {us_state_id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  Us_states.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving us_states."
      });
    });
};

// Find a single Us_states with an id
exports.findOne = (req, res) => {
  const us_state_id = req.params.us_state_id;

  Us_states.findByPk(us_states_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Us_states with id=" + us_state_id
      });
    });
};

// Update a Us_states by the id in the request
exports.update = (req, res) => {
  
  const us_state_id = req.params.us_state_id;
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Us_states.update(req.body, {
    where: { us_state_id: us_state_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Us_states was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Us_states with id=${us_state_id}. Maybe Us_states was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Us_states with id=" + us_state_id
      });
    });
};

// Delete a Us_states with the specified id in the request
exports.delete = (req, res) => {
  const us_state_id = req.params.us_state_id;

  Us_states.destroy({
    where: { us_state_id: us_state_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Us_states was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Us_states with id=${us_state_id}. Maybe Us_states was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Us_states with id=" + us_state_id
      });
    });
};


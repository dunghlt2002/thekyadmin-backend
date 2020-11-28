const db = require("../models");
const Provider = db.providers;
const Op = db.Sequelize.Op;

// Create and Save a new Provider
exports.create = (req, res) => {
  // Validate request
  if (!req.body.providers_name) {
    res.status(400).send({
      message: "Provider name can not be empty!"
    });
    return;
  }

  // Create a Provider
  const Provider = {
    providers_name: req.body.providers_name,
    providers_status: req.body.providers_status ? req.body.providers_status : false
  };

  // Save Provider in the database
  Provider.create(Provider)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider."
      });
    });
};

// Retrieve all providers from the database.
exports.findAll = (req, res) => {
  console.log('hihihi we are here in CAT search');
  // const providers_name = req.query.providers_name;
  // var condition = providers_name ? { providers_name: { [Op.like]: `%${providers_name}%` } } : null;

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {providers_name: { [Op.like]: `%${search_keyword}%`} }, 
      {providers_id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  Provider.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers."
      });
    });
};

// Retrieve all MASTER providers from the database.
exports.findMaster = (req, res) => {
  console.log('hihihi we are here in CAT');
  const providers_name = req.query.providers_name;
  //var condition = providers_name ? { providers_name: { [Op.like]: `%${providers_name}%` } } : null;
  var condition = { providers_parentid: { [Op.gt]: 0} , providers_status: 0 };

  Provider.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers."
      });
    });
};

// Retrieve all NOT MASTER providers from the database.
exports.findNotMaster = (req, res) => {
  console.log('hihihi we are here in NOT master CAT');
  const providers_name = req.query.providers_name;
  //var condition = providers_name ? { providers_name: { [Op.like]: `%${providers_name}%` } } : null;
  // var condition = { providers_parentid: 0, providers_status: 0 };
  var condition = 
  {
    [Op.and]: [
      {providers_parentid: { [Op.gt]: 0} }, 
      {providers_status: { [Op.eq]: 0} }]
  }

  Provider.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers."
      });
    });
};

// Find a single Provider with an id
exports.findOne = (req, res) => {
  const providers_id = req.params.providers_id;

  Provider.findByPk(providers_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Provider with id=" + providers_id
      });
    });
};

// Update a Provider by the id in the request
exports.update = (req, res) => {
  
  const providers_id = req.params.providers_id;
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Provider.update(req.body, {
    where: { providers_id: providers_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Provider was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Provider with id=${providers_id}. Maybe Provider was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Provider with id=" + providers_id
      });
    });
};

// Delete a Provider with the specified id in the request
exports.delete = (req, res) => {
  const providers_id = req.params.providers_id;

  Provider.destroy({
    where: { providers_id: providers_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Provider was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Provider with id=${providers_id}. Maybe Provider was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Provider with id=" + providers_id
      });
    });
};

// Delete all providers from the database.
exports.deleteAll = (req, res) => {
  Provider.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} providers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all providers."
      });
    });
};

// find all providers_status Provider
exports.findAllproviders_status = (req, res) => {
  Provider.findAll({ where: { providers_status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers."
      });
    });
};

const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.categories_name) {
    res.status(400).send({
      message: "Category name can not be empty!"
    });
    return;
  }

  // Create a Category
  const Category = {
    categories_name: req.body.categories_name,
    categories_status: req.body.categories_status ? req.body.categories_status : false
  };

  // Save Category in the database
  Category.create(Category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
  console.log('hihihi we are here in CAT search');
  // const categories_name = req.query.categories_name;
  // var condition = categories_name ? { categories_name: { [Op.like]: `%${categories_name}%` } } : null;

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {categories_name: { [Op.like]: `%${search_keyword}%`} }, 
      {categories_id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  Category.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

// Retrieve all MASTER categories from the database.
exports.findMaster = (req, res) => {
  console.log('hihihi we are here in CAT');
  const categories_name = req.query.categories_name;
  //var condition = categories_name ? { categories_name: { [Op.like]: `%${categories_name}%` } } : null;
  var condition = { parent_id: 0, categories_status: 0 };

  Category.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

// Retrieve all NOT MASTER categories from the database.
exports.findNotMaster = (req, res) => {
  console.log('hihihi we are here in NOT master CAT');
  const categories_name = req.query.categories_name;
  //var condition = categories_name ? { categories_name: { [Op.like]: `%${categories_name}%` } } : null;
  // var condition = { parent_id: 0, categories_status: 0 };
  var condition = 
  {
    [Op.and]: [
      {parent_id: { [Op.gt]: 0} }, 
      {categories_status: { [Op.eq]: 0} }]
  }

  Category.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const categories_id = req.params.categories_id;

  Category.findByPk(categories_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + categories_id
      });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  
  const categories_id = req.params.categories_id;
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Category.update(req.body, {
    where: { categories_id: categories_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${categories_id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + categories_id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const categories_id = req.params.categories_id;

  Category.destroy({
    where: { categories_id: categories_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${categories_id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + categories_id
      });
    });
};

// Delete all categories from the database.
exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} categories were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories."
      });
    });
};

// find all categories_status Category
exports.findAllcategories_status = (req, res) => {
  Category.findAll({ where: { categories_status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

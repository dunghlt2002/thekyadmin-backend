const db = require("../models");
const SystemPara = db.systempara;
const Op = db.Sequelize.Op;

// Create and Save a new SystemPara - chua kiem tra
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "SystemPara content can not be empty!"
    });
    return;
  }

  // Create a SystemPara
  const SystemPara = {
    content: req.body.content,
    status: req.body.status ? req.body.status : false
  };

  // Save SystemPara in the database
  SystemPara.create(SystemPara)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SystemPara."
      });
    });
};

// Retrieve all systempara from the database - chuc nang su dung chinh
exports.findAll = (req, res) => {
  console.log('hihihi we are here in system para search');

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  // Trong systemPara nay can toan tu chinh xac EQ chu khong LIKE duoc
  var condition = search_keyword ? 
  {
    [Op.or]: [
      {content: { [Op.eq]: `${search_keyword}`} }]
  } : null;

  SystemPara.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving systempara."
      });
    });
};

// Find a single SystemPara with an id - chua kiem tra
exports.findOne = (req, res) => {
  const id = req.params.id;

  SystemPara.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SystemPara with id=" + id
      });
    });
};

// Update a SystemPara by the id in the request - chua kiem tra
exports.update = (req, res) => {
  
  const id = req.params.id;
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  SystemPara.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SystemPara was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update SystemPara with id=${id}. Maybe SystemPara was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating SystemPara with id=" + id
      });
    });
};

// Delete a SystemPara with the specified id in the request - chua kiem tra
exports.delete = (req, res) => {
  const id = req.params.id;

  SystemPara.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SystemPara was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete SystemPara with id=${id}. Maybe SystemPara was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete SystemPara with id=" + id
      });
    });
};

// Delete all systempara from the database. - chua kiem tra
exports.deleteAll = (req, res) => {
  SystemPara.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} systempara were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all systempara."
      });
    });
};

// find all status SystemPara
exports.findAllstatus = (req, res) => {
  SystemPara.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving systempara."
      });
    });
};

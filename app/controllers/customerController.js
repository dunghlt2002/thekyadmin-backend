const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;
var crypto = require('crypto');

// reset password request, update temporary token in customer TABLE
// THU 4/6/2021
exports.resetPasswordRequest = (req, res) => {
  
  const customers_email = req.params.customers_email;

  Customer.findOne({ where: { customers_email: customers_email } })
    .then(data => {
              
              if (data === null) {
                console.log('email not in DB');
                // res.status(403).send('email not in DB');
                // res.send(data);
              } else {
                const token = crypto.randomBytes(6).toString('hex');
                data.update({
                  customers_passwordtoken: token,
                });
              }
              res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};


// const jwt = require('jsonwebtoken');
const utils = require('../utils');

// signin 09262020
exports.signin = async (req, res) => {
  
  //console.log('body ' + req.body);
  const customers_email = req.body.customers_email;
  const customers_password = req.body.customers_password;

  console.log('hihihi we are here signin ' + customers_email);

  const customerSelect = await Customer.findOne({ where: {customers_email: customers_email, customers_password: customers_password} });

  if (customerSelect) {
          res.send({
              id: customerSelect.id,
              customers_email: customerSelect.customers_email,
              customers_name: customerSelect.customers_name,
              chutcheo_city: customerSelect.chutcheo_city,
              token: utils.generateToken(customerSelect)
          });
          console.log('data return trong backend ' + customerSelect.customers_email);
  } else {
    res.status(401).send({ error: 'Invalid Email or Password.' });
  }
     
};

// Create and Save a new Customer
exports.create = (req, res) => {
  console.log('vo create begin');
  // Validate request
  if (!req.body.customers_email) {
    res.status(400).send({
      message: "Customer email an not be empty!"
    });
    return;
  }

  // Create a Customer
  const newCustomer = {
    customers_name: req.body.customers_name,
    customers_email: req.body.customers_email,
    customers_password: req.body.customers_password,
    custadv: req.body.custadv ? req.body.custadv : false,
    customers_address: req.body.customers_address,
    customers_city: req.body.customers_city,
    customers_zip: req.body.customers_zip,
    customers_state: req.body.customers_state,
    customers_country: req.body.customers_country,
    customers_phone: req.body.customers_phone,
  };

  // Save Customer in the database
  Customer.create(newCustomer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

// find customer by email
exports.findOneByEmail = (req, res) => {
  
  const customers_email = req.params.customers_email;

  // var condition = search_keyword ? 
  // {
  //   [Op.or]: [
  //     {customers_email: { [Op.like]: `%${customers_email}%`} }
  //   ]
  // } : null;


  Customer.findAll({ where: { customers_email: customers_email } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};


// Retrieve all customers from the database.
exports.findAll = (req, res) => {
  console.log('hihihi we are here ALL customer');

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {customers_name: { [Op.like]: `%${search_keyword}%`} }, 
      {customers_id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  Customer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

// Retrieve all customers from the database and count All
exports.findAndCountAll = (req, res) => {
    console.log('hihihi we are here customer count all');
    let limit = 15;   // number of records per page
    let offset = 0;
    

    // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
    const search_keyword = req.query.search_keyword;
    console.log('keyword' + search_keyword);
    var group = ['customers_id'];
    var condition = search_keyword ? 
    {
      [Op.or]: [
        {customers_name: { [Op.like]: `%${search_keyword}%`} }, 
        {customers_id: { [Op.like]: `%${search_keyword}%`} }]
    } : null;

    Customer.findAndCountAll({ where: condition })
      .then(data => {
        let page = req.params.currentPage;      // page number
        
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        // res.send(data);
        Customer.findAll({ where: condition ,limit: limit,offset: offset})
        .then(data => {
          // const response = getPagingData(data, page, limit);
          console.log('a: ' + data[0].id);
          console.log('a: ' + data[0].customers_name);
          
          res.send({'data': data, 'pages': pages});
          
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        });

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while counting customers."
        });
      });
};




// Find a single Customer with an id
exports.findOne = (req, res) => {
  const customers_id = req.params.customers_id;

  Customer.findByPk(customers_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + customers_id
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  
  const customers_id = req.params.customers_id;
  console.log('vo update for customer ' + customers_id);
  console.log(req.body);
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Customer.update(req.body, {
    where: { customers_id: customers_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${customers_id}. Maybe Customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + customers_id
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const customers_id = req.params.customers_id;

  Customer.destroy({
    where: { customers_id: customers_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${customers_id}. Maybe Customer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + customers_id
      });
    });
};

// Delete all customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} customers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    });
};

// find all customers_status Customer
exports.findAllcustomers_status = (req, res) => {
  Customer.findAll({ where: { customers_status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};



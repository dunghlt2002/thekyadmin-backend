const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.orders_name) {
    res.status(400).send({
      message: "Order name can not be empty!"
    });
    return;
  }

  // Create a Order
  const Order = {
    orders_name: req.body.orders_name,
    orders_customer_id: req.body.orders_customer_id,
    orders_date: req.body.orders_date,
    orders_status: req.body.orders_status ? req.body.orders_status : false,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country,
    ship: req.body.ship,
    tax: req.body.tax,
    discount: req.body.discount,
    orders_desc: req.body.orders_desc
  };

  // Save Order in the database
  Order.create(Order)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
};

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
  
  // const orders_name = req.query.orders_name;
  // var condition = orders_name ? { orders_name: { [Op.like]: `%${orders_name}%` } } : null;


  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;


  //customer.customers_name
  var condition = search_keyword ? 
  {
    [Op.or]: [
      {name: { [Op.like]: `%${search_keyword}%`} }, 
      {orders_id: { [Op.like]: `%${search_keyword}%`} },
      {orders_customer_id: { [Op.like]: `%${search_keyword}%`} }
    ]
  } : null;

  // Dong include cuc ky quan trong nhe
  // Level 1
  // Order.findAll({ where: condition, order: [['orders_id', 'DESC']], include : [{model: db.orderdetail}]} )

  // Level 2
  // Order.findAll({
  //   where: condition, 
  //   order: [['orders_id', 'DESC']], 
  //   include: [
  //     {model: db.orderdetail, include: [{model: db.products}]}, 
  //   ]
  // })


  Order.findAll({
    where: condition, 
    order: [['orders_id', 'DESC']], 
    include: [
      {model: db.orderdetail, include: [{model: db.products}]},
      {model: db.customers} 
    ],
    nest:false
  })
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};

// Find a single Order with an id - xai ma sai sai
exports.findOne = (req, res) => {
  console.log('fineOne order');
  const orders_id = req.params.orders_id;

  // Order.findByPk(orders_id)
  Order.findByPk(
    orders_id, 
    {include: [
      {model: db.orderdetail, include: [{model: db.products}]},
      {model: db.customers} 
    ],})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + orders_id
      });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  
  const orders_id = req.params.orders_id;
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Order.update(req.body, {
    where: { orders_id: orders_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${orders_id}. Maybe Order was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Order with id=" + orders_id
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const orders_id = req.params.orders_id;

  Order.destroy({
    where: { orders_id: orders_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${orders_id}. Maybe Order was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Order with id=" + orders_id
      });
    });
};

// Delete all orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} orders were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders."
      });
    });
};

// find all orders_status Order
exports.findAllorders_status = (req, res) => {
  Order.findAll({ where: { orders_status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    });
};

const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;


// Retrieve all products only by ABC  from the database and count All
exports.findABCAndCountAll = (req, res) => {
  console.log('hihihi we are here product ABC and more ... ');
  let limit = 18;   // number of records per page
  let offset = 0;

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_abc = req.query.search_abc;

  console.log('abc : ' + search_abc);
  
  var condition = {products_name: { [Op.like]: `${search_abc}%`} }

  console.log('dk ne: ' + JSON.stringify(condition));

  Product.findAndCountAll({ where: condition })
    .then(data => {
      let page = req.params.currentPage;      // page number
      
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      // res.send(data);
      Product.findAll({ where: condition ,limit: limit,offset: offset})
      .then(data => {
        // const response = getPagingData(data, page, limit);
        console.log('a: ' + data[0].id);
        console.log('a: ' + data[0].products_name);
        res.send({'data': data, 'pages': pages});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting products."
      });
    });
};


// Retrieve all products by condition (search, retail, longtieng, category) from the database and count All
exports.findAndCountAll = (req, res) => {
  console.log('hihihi we are here product count all');
  let limit = 18;   // number of records per page
  let offset = 0;
  

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;
  var search_abc = req.query.search_abc;
  var search_category = req.query.search_category;
  var search_retail = req.query.search_retail;
  var usvn_longtieng = req.query.usvn_longtieng;
  

  console.log('keyword : ' + search_keyword);
  console.log('cat : ' + search_category);
  console.log('retail : ' + search_retail);
  console.log('Lng tieng : ' + usvn_longtieng);
  console.log('abc  : ' + search_abc);

  var condition = (search_keyword) ? 
  {
    [Op.or]: [
      {products_name: { [Op.like]: `%${search_keyword}%`} }, 
      {products_name_en: { [Op.like]: `%${search_keyword}%`} }, 
      {products_id: { [Op.like]: `%${search_keyword}%`} },
    ],
    [Op.and]: [
      search_retail>-1?{products_retail: { [Op.eq]: `${search_retail}`} }:null,
      search_category>-1?{categories_id: { [Op.eq]: `${search_category}`} }:null,
      usvn_longtieng>-1?{products_ngonngu: { [Op.eq]: `${usvn_longtieng}`} }:null,
      search_abc.length===1?{products_name: { [Op.like]: `${search_abc}%`} }:null,
      search_abc.length===1?{products_name_en: { [Op.like]: `${search_abc}%`} }:null,
    ]
  } : 
  {
    [Op.and]: [
      search_retail>-1?{products_retail: { [Op.eq]: `${search_retail}`} }:null,
      search_category>-1?{categories_id: { [Op.eq]: `${search_category}`} }:null,
      usvn_longtieng>-1?{products_ngonngu: { [Op.eq]: `${usvn_longtieng}`} }:null,
      search_abc.length===1?{products_name: { [Op.like]: `${search_abc}%`} }:null,
    ]
  } ;

  console.log('dk ne: ' + JSON.stringify(condition));

  Product.findAndCountAll({ where: condition })
    .then(data => {
      let page = req.params.currentPage;      // page number
      
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      // res.send(data);
      Product.findAll({ where: condition ,limit: limit,offset: offset})
      .then(data => {
        // const response = getPagingData(data, page, limit);
        console.log('a: ' + data[0].id);
        console.log('a: ' + data[0].products_name);
        
        res.send({'data': data, 'pages': pages});
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting products."
      });
    });
};


// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.products_name) {
    res.status(400).send({
      message: "Product name can not be empty!"
    });
    return;
  }

  // Create a Product
  const newProduct = {
    products_name: req.body.products_name,
    products_name_en: req.body.products_name_en,
    products_image: req.body.products_image,
    products_price: req.body.products_price,
    products_soluong: req.body.products_soluong,
    products_status: req.body.products_status ? req.body.products_status : false,
    products_description: req.body.products_description,
    products_retail: req.body.products_retail,
    products_sotap: req.body.products_sotap,
    products_nguonphim: req.body.products_nguonphim,
    products_chatluong: req.body.products_chatluong,
    products_dienvien: req.body.products_dienvien,
    products_ngaynhaphang: req.body.products_ngaynhaphang
  };

  // Save Product in the database
  Product.create(newProduct)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Product."
    });
  });

  
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {

    // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
    const search_keyword = req.query.search_keyword;

    var condition = search_keyword ? 
    {
      [Op.or]: [
        {products_name: { [Op.like]: `%${search_keyword}%`} }, 
        {products_name_en: { [Op.like]: `%${search_keyword}%`} }, 
        {products_id: { [Op.like]: `%${search_keyword}%`} }]
    } : null;

    // var condition = search_keyword ? 
    //   { products_name: { [Op.like]: `%${search_keyword}%` }
    //   } : null;

    //console.log('condition la  ' + condition);

    Product.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const products_id = req.params.products_id;

  Product.findByPk(products_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + products_id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  
  const products_id = req.params.products_id;
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Product.update(req.body, {
    where: { products_id: products_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${products_id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + products_id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const products_id = req.params.products_id;

  Product.destroy({
    where: { products_id: products_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${products_id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + products_id
      });
    });
};

// Delete all products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};

// find all products_status Product
exports.findAllproducts_status = (req, res) => {
  Product.findAll({ where: { products_status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

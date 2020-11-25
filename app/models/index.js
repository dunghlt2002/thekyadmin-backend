const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user_data = require("./userModel.js")(sequelize, Sequelize);
db.products = require("./productModel.js")(sequelize, Sequelize);
db.categories = require("./categoryModel.js")(sequelize, Sequelize);
db.customers = require("./customerModel.js")(sequelize, Sequelize);
db.orders = require("./orderModel.js")(sequelize, Sequelize);
db.orderdetail = require("./orderDetailModel.js")(sequelize, Sequelize);
// da chinh orderdetail thanh orderDetail

db.orders.hasMany(db.orderdetail, {
  foreignKey: 'ordersdetail_ordersid'
});
db.orderdetail.belongsTo(db.orders, {
  foreignKey: 'ordersdetail_ordersid'
});

db.products.hasMany(db.orderdetail, {
  foreignKey: 'ordersdetail_product_id'
});
db.orderdetail.belongsTo(db.products, {
  foreignKey: 'ordersdetail_product_id'
});

//orders_customer_id
db.customers.hasMany(db.orders, {
  foreignKey: 'orders_customer_id'
});
db.orders.belongsTo(db.customers, {
  foreignKey: 'orders_customer_id'
});


module.exports = db;

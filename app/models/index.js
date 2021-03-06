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

// hinh nhu khong can user_data nua 12282020 - xai chung voi customer luon
db.user_data = require("./userModel.js")(sequelize, Sequelize);

db.products = require("./productModel.js")(sequelize, Sequelize);
db.categories = require("./categoryModel.js")(sequelize, Sequelize);
db.us_states = require("./us_statesModel.js")(sequelize, Sequelize);
db.systempara = require("./systemparaModel.js")(sequelize, Sequelize);
db.providers = require("./providerModel.js")(sequelize, Sequelize);
db.categories = require("./categoryModel.js")(sequelize, Sequelize);
db.customers = require("./customerModel.js")(sequelize, Sequelize);
db.orders = require("./orderModel.js")(sequelize, Sequelize);
db.orderdetail = require("./orderdetailModel.js")(sequelize, Sequelize);


db.orders.hasMany(db.orderdetail, {
  foreignKey: 'ordersdetail_ordersid'
});
db.orderdetail.belongsTo(db.orders, {
  foreignKey: 'ordersdetail_ordersid'
});

//orders_customer_id
db.customers.hasMany(db.orders, {
  foreignKey: 'orders_customer_id'
});
db.orders.belongsTo(db.customers, {
  foreignKey: 'orders_customer_id'
});

db.products.hasMany(db.orderdetail, {
  foreignKey: 'ordersdetail_product_id'
});
db.orderdetail.belongsTo(db.products, {
  foreignKey: 'ordersdetail_product_id'
});

// Relation between categories & products
db.categories.hasMany(db.products, {
  foreignKey: 'categories_id'
});
db.products.belongsTo(db.categories, {
  foreignKey: 'categories_id'
});

// Relation between providers & products
db.providers.hasMany(db.products, {
  foreignKey: 'providers_id'
});
db.products.belongsTo(db.providers, {
  foreignKey: 'providers_id'
});

module.exports = db;

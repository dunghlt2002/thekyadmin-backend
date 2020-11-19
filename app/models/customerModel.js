module.exports = (sequelize, Sequelize) => {

    const Customer = sequelize.define("customers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'customers_id'
      },
      customers_name: {
        type: Sequelize.STRING
      },
      customers_email: {
        type: Sequelize.STRING
      },
      customers_address: {
        type: Sequelize.STRING
      },
      customers_city: {
        type: Sequelize.STRING
      },
      customers_state: {
        type: Sequelize.STRING
      },
      customers_country: {
        type: Sequelize.STRING
      },
      customers_zip: {
        type: Sequelize.STRING
      },
      customers_password: {
        type: Sequelize.STRING
      },
      custadv: {
        type: Sequelize.BOOLEAN
      }
    }
    , 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,  // tat updatedAt createdAt
      underscored: true   // khong tao them column customer_id
    });
    // Product.removeAttribute('updatedAt');
    // Product.removeAttribute('createdAt');
    
    return Customer;
  
   };  // cua export
  
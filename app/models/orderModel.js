module.exports = (sequelize, Sequelize) => {

    const Order = sequelize.define("orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'orders_id'
      },
      orders_customer_id: {
        type: Sequelize.STRING,
        foreignKey: true
      },
      orders_date: {
        type: Sequelize.STRING
      },
      orders_status: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      ship: {
        type: Sequelize.DECIMAL
      },
      tax: {
        type: Sequelize.DECIMAL
      },
      orders_promotion: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      grand_amount: {
        type: Sequelize.DECIMAL
      },
      payment_id: {
        type: Sequelize.STRING
      },
      payment_update_time: {
        type: Sequelize.STRING
      },
      payment_status: {
        type: Sequelize.STRING
      },
      payment_email: {
        type: Sequelize.STRING
      },
      orders_des: {
        type: Sequelize.STRING
      }
    }
    , 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,  // tat updatedAt createdAt
      underscored: false   // chua biet
    }
    // ,
    // {
    //   classMethods: {
    //     associate: function(models) {
    //       Order.belongsTo(models.Customer,{
    //         'onDelete' : "CASCADE",
    //         foreignKey : {
    //           allowNull : false
    //         }
    //       });
    //       Order.hasMany(models.OrderDetail);
    //     }
    //   }
    // }
    );
    
    return Order;
  
   };  // cua export
  
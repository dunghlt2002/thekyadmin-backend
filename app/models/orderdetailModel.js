
module.exports = (sequelize, Sequelize) => {

    const OrderDetail = sequelize.define("orderdetail", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ordersdetail_id'
        },
      ordersdetail_product_id: { 
          type: Sequelize.STRING,
          foreignKey: true
        },
      ordersdetail_quantity: { type: Sequelize.INTEGER },
      ordersdetail_price: { type: Sequelize.INTEGER },
      ordersdetail_ordersid: { 
          type: Sequelize.INTEGER,
          foreignKey: true 
        },
      ordersdetail_status: { type: Sequelize.STRING }
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
    //       OrderDetail.belongsTo(models.Order,{
    //         'onDelete' : "CASCADE",
    //         foreignKey : {
    //           name: ordersdetail_ordersid,
    //           allowNull : false
    //         }
    //       });
    //       // OrderDetail.belongsTo(models.Product,{
    //       //       foreignKey : {
    //       //         allowNull : false
    //       //       }
    //       // });
    //      }
    //    }
    // }
  );
  

      
    return OrderDetail;
  
   };  // cua export
  
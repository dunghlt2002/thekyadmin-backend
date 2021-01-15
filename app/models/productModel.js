module.exports = (sequelize, Sequelize) => {

    const Product = sequelize.define("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'products_id'
      },
      products_name: {
        type: Sequelize.STRING
      },
      products_name_en: {
        type: Sequelize.STRING
      },
      categories_id: {
        type: Sequelize.INTEGER
      },
      providers_id: {
        type: Sequelize.INTEGER
      },
      products_image: {
        type: Sequelize.STRING
      },
      products_image_large: {
        type: Sequelize.STRING
      },
      products_price: {
        type: Sequelize.DECIMAL
      },
      products_soluong: {
        type: Sequelize.INTEGER
      },
      products_status: {
        type: Sequelize.BOOLEAN
      },
      products_description: {
        type: Sequelize.STRING
      },
      products_retail: {
        type: Sequelize.BOOLEAN
      },
      products_sotap: {
        type: Sequelize.INTEGER
      },
      products_nguonphim: {
        type: Sequelize.STRING
      },
      products_chatluong: {
        type: Sequelize.STRING
      },
      products_dienvien: {
        type: Sequelize.STRING
      },
      products_ngaynhaphang: {
        type: Sequelize.STRING
      },
      products_retail: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.INTEGER
      },
      products_description: {
        type: Sequelize.STRING
      }
    }
    , 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,  // tat updatedAt createdAt
      underscored: false   // chua biet
    });
    
    return Product;
  
   };  // cua export
  
module.exports = (sequelize, Sequelize) => {
  
    const Category = sequelize.define("categories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'categories_id'
      },
      categories_name: {
        type: Sequelize.STRING
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      categories_status: {
        type: Sequelize.BOOLEAN
      }
    }   // cua cai const Category
    , 
    {   // cac setup khac cua define
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false,  // tat updatedAt createdAt
      underscored: true   // chua biet
    }   // het cac setup khac
    );  // het define Category
  
    
    return Category ;
  
  };  // cua export
  
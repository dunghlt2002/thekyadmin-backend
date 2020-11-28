module.exports = (sequelize, Sequelize) => {
  
    const Provider = sequelize.define("providers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'providers_id'
      },
      providers_name: {
        type: Sequelize.STRING
      },
      providers_parentid: {
        type: Sequelize.INTEGER
      },
      providers_status: {
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
  
    
    return Provider ;
  
  };  // cua export
  
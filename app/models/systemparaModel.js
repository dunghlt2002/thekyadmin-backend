module.exports = (sequelize, Sequelize) => {
  
    const SystemPara = sequelize.define("systempara", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      description: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.BOOLEAN
      }
    }   // cua cai const Category
    , 
    {   // cac setup khac cua define
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: true,  // tat updatedAt createdAt
      underscored: false   // su dung ky tu _ giua cac word trong field vi du create_At
    }   // het cac setup khac
    );  // het define Category
  
    
    return SystemPara ;
  
  };  // cua export
  
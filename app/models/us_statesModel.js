module.exports = (sequelize, Sequelize) => {

    const Us_states = sequelize.define("us_states", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'us_state_id'
      },
      us_state_symbol: {
        type: Sequelize.STRING
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
    
    return Us_states;
  
   };  // cua export
  
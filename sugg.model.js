module.exports = (sequelize, Sequelize) => {
    const madesugg = sequelize.define("madesugg", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ip: {
        type: Sequelize.STRING
      },
      madedsugg: {
        type: Sequelize.INTEGER
      }
    });
  
    return madesugg;
  };
  
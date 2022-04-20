module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ip: {
        type: Sequelize.STRING
      },
      canvote: {
        type: Sequelize.BOOLEAN
      },
      canpublish: {
        type: Sequelize.BOOLEAN
        }
    });
  
    return user;
  };
  
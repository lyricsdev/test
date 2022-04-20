module.exports = (sequelize, Sequelize) => {
    const votes = sequelize.define("votes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ip: {
        type: Sequelize.STRING
      },
      votes: {
        type: Sequelize.INTEGER
      },
      suggestionId: {
        type: Sequelize.INTEGER
      }
    });
  
    return votes;
  };
  
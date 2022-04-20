module.exports = (sequelize, Sequelize) => {
    const suggestion = sequelize.define("suggestion", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      votes: {
        type: Sequelize.INTEGER
      }
    });
  
    return suggestion;
  };
  
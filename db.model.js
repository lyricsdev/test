const config = require("./db.config.js");
const schedule = require('node-schedule');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.suggestion = require("./suggestions.model")(sequelize, Sequelize);
db.votes = require("./votes.model")(sequelize, Sequelize);
db.madesugg = require("./sugg.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);

schedule.scheduleJob({hour: 24, minute: 00}, () => {
            User.update({
              canpublish: true,
              canvote: true });
});
 
module.exports = db;

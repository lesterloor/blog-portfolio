var Sequelize = require("sequelize");

var sequelize = new Sequelize({
  username: "postgres",
  password: "blu",
  dialect: "postgres",
  database: "blog"
});

var addArticle = sequelize.define("article", {
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  }
});

addArticle.sync();

module.exports = addArticle;

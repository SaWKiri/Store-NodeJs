const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNul: false,
    primaryKey: true,
  },
  userName: {
      type: Sequelize.STRING,
      allowNul: false
  },
  email: {
      type: Sequelize.STRING,
      allowNul: false
  }
});

module.exports = User;
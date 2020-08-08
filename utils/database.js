// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'blacky',
//     database: 'node-complete',
//     waitForConnections: true,
//     password: 'ZAQ1!xsw2@'
// });

// module.exports = pool.promise();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'blacky', 'zaq1xsw2', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
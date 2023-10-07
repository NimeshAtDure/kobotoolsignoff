const Sequelize = require('sequelize');
const dbconfig = require('../config/databaseconfig');


//Creating DB connection 
// const sequelize = new Sequelize(dbconfig.booksPostgresURI, {
//   dialect: 'postgres'
// });

const sequelize = new Sequelize("uatkobosuperdb", "uatkobosuperuser", "PRiJvMX8TyrT8", {
  host: "20.219.28.160",
  dialect: "postgres",
  port:5433,
  operatorsAliases: false,
  pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000
  }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('unable to connect to database', err);
});

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  OTP: {
    type: Sequelize.STRING,
  },
  
  OTPCreatedTime: {
    type: Sequelize.DATE,
  },

  OTPAttempts:{
    type:Sequelize.INTEGER
  },

  isBlocked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

User.sync()
module.exports = {User,sequelize};


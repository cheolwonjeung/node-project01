
const { Sequelize, DataTypes }  = require('sequelize');


const sequelize = require('../utils/database')



//creates a table called user and stores the user records 
const User = sequelize.define('user', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
    
  },
  email : {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    }
 }

})

module.exports = sequelize.model('user', User);


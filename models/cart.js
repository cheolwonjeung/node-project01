const { Sequelize, DataTypes }  = require('sequelize');


const sequelize = require('../utils/database')



const Cart = sequelize.define('cart', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
    
  
  })
  
  module.exports = sequelize.model('cart', Cart);
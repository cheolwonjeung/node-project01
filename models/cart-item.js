const { Sequelize, DataTypes }  = require('sequelize');


const sequelize = require('../utils/database')



const CartItem = sequelize.define('cart-item', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
     type: DataTypes.INTEGER,
     defaultValue: 1,
     allowNull: false
    }
  
  })
  
  module.exports = sequelize.model('cart-item', CartItem);
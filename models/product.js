
const { Sequelize, DataTypes }  = require('sequelize');


const sequelize = require('../utils/database')

const moment = require('moment')



//creates a table called product and stores the product records 
const Product = sequelize.define('product', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
    
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  date : {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment.utc().format('YYYY-MM-DD'),
  }

})

module.exports = sequelize.model('product', Product);


//console.log(Product === sequelize.models.Product);










































///below code when there is no use of "sequelize" method...!

//const connectionPromise = require ('../utils/database');




// //class construtor models with model functions..
// module.exports = class Product {
//     constructor(id, description, title, price) {
//       this.id = id;
//       this.description = description;
//       this.title = title;
//       this.price = price;
//     }
  
    
// save() {
  
//     return connectionPromise.execute(
//       'INSERT INTO node_platform.products (id, description, title, price) VALUES (?, ?, ?, ?)', 
//         [this.id, this.description, this.title, this.price])

//    }
 


// static fetchAll() {
  
//    return connectionPromise.execute('SELECT * FROM node_platform.products')
    

//   } 


// static fetchById(id) {

//   return connectionPromise.execute('SELECT * FROM node_platform.products WHERE node_platform.products.id = ?', [id])
//   }
  


// }



//static deleteById (id) {





///static 을 붙이는 이유와 붙이지 않는 이유 찾아보기..
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const path = require('path');
//var http = require('http');

//Express is a routing and middleware web framework that has minimal functionality of its own:
//Bind application-level middleware to an instance of the app object by using the app.use()
const express = require('express');
const app = express();
//const PORT = 8000
const Product = require('./models/product')
//const mysql = require('mysql2')

//parses information from POST
const bodyParser = require("body-parser");

//import the sequelize..!
const Sequelize = require('sequelize');
const sequelize = require('./utils/database')

// view engine setup
app.set('views', path.join(__dirname+ '/views/'));
app.set('view engine', 'ejs');

// static css file & middleware
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));

//import the model for association!!

const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')


// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.json());

app.use(bodyParser.json());

//app.use(express.bodyParser());

//app.use(require('connect').bodyParser());

//set custom port if provided
//the process.env.PORT line checks if a port environment variable is defined
const PORT = process.env.PORT || 8000;


//app.set('views', path.join(__dirname,'views'));

app.use( (req, res, next) => {
  return User.findByPk(1)
  .then(user => {
     req.user = user
     next();
  })
  .catch(err => console.log(err))
})

// mount the router at the first path 
app.use('/', shopRoute);

app.use('/admin', adminRoute);


app.set('port', 8000);
//app.set('port', process.env.PORT || 8000);








////define the association...!!
//one to many relations ; needs to have foreign key on product
//Product can't exist without user.. user can exist without product
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
//one to one relations ; cart needs to have foreign key..
//cart can't exisit without user.. but user can exist without cart
User.hasOne(Cart);
Cart.belongsTo(User);
//many to many relations ;
Product.belongsToMany(Cart, { through: 'cart-item' });
Cart.belongsToMany(Product, { through: 'cart-item' });


//sync() will create database for product(create columns for defined keys not the values..), which also create User (User doens't have model here)
// However, User is not only created for the defined columns but also values here..(app.js)
//

sequelize.sync()
    .then((result) => {
        console.log(`Database & tables created!`);
        return Promise.resolve(result)
        .then((result)=> {
          return User.findByPk(1)
          .then(user => {
            if(user) {  //return Promise.resolve(user).then() block 을 사용했는데 이부분은 필요없는 부분이라 지웠더니 createCart가 작동함.
                return user.createCart()
                .then(cart => {
                console.log('create the cart of which id is 1..!')
                console.log('Successfully created User models with id: 1');
                return app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))})
                
                .catch(err => console.log(err))
          } return User.create({ 
            id : 1,
            name: 'test',
            email: 'test@test.com'
          }) 
          .then(user => {
              return user.createCart()
              .then(cart => {
              console.log('create the cart of which id is 1..!')
              console.log('Successfully created User models with id: 1');
              return app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))})
              })   
          .catch(err => console.log(err))
          
        }) 
        .catch(err => console.log(err)) 
         })
        .catch(err => console.log(err))
        })
        .catch(err => console.log(err)) 
        
    
    


     
    
        
        
            
        
       
       

    
    
   
    ;




//app.listen(app.get('port'));


// Product.sync()
// .then(result => {
//     console.log('successfully syncing data to database!')
//     app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
// })

// .catch(err => console.log(err));
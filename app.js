const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const path = require('path');
//var http = require('http');
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

//app.use(express.static(path.join(__dirname, 'public')));



// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.json());

app.use(bodyParser.json());

//app.use(express.bodyParser());

app.use(require('connect').bodyParser());

//set custom port if provided
//the process.env.PORT line checks if a port environment variable is defined
const PORT = process.env.PORT || 8000;


//app.set('views', path.join(__dirname,'views'));



// mount the router at the first path 
app.use('/shop', shopRoute);

app.use('/admin', adminRoute);


app.set('port', 8000);
//app.set('port', process.env.PORT || 8000);

//
app.use((req, res, next)=> {
  return User = req.user
  
})





////define the association...!!
//one to many relations ; needs to have foreign key on product
//Product can't exist without user.. user can exist without product
User.hasMany(Product);
Product.belongsTo(User);
//one to one relations ; cart needs to have foreign key..
//cart can't exisit without user.. but user can exist without cart
User.hasOne(Cart);
Cart.belongsTo(User);
//many to many relations ;
Product.belongsToMany(Cart);
Cart.belongsToMany(Product);


//sync() will create database for product(create columns for defined keys not the values..), which also create User (User doens't have model here)
// However, User is not only created for the defined columns but also values here..(app.js)
//

sequelize.sync({ force:true})
    .then(() => {
        console.log(`Database & tables created!`);
        
    })
    .then(()=> { 
       if (!User) {
        User.create({
            name: 'max',
            email : 'test@test.com'
        })
        .then(result =>{
         return Promise.resolve(User);
         console.log('Successfully created User models with id: 1');
         return app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
        
            })
        .catch(err => console.log(err))
       }
       else {
        return Promise.resolve(User);
        console.log('Successfully created User models with id: 1');
        return app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
        
       }

    })
    
    .catch((error)=>{
        return console.log(error);
    });




//app.listen(app.get('port'));


// Product.sync()
// .then(result => {
//     console.log('successfully syncing data to database!')
//     app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
// })

// .catch(err => console.log(err));
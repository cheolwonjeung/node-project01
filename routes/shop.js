// Importing express module 
const express = require("express") 

const router = express.Router() 

//import * as productController from '../controllers/shop';

const productController = require('../controllers/shop')

//console.log(productController);


// Handling request using router 

router.route("/").get(productController.getHome); 


router.route("/about").get(productController.getAbout); 


router.route("/product").get(productController.getProductList); 


router.route("/product/:id").get(productController.getProductDetail); 


//router.get("/contact", productController.getMain); 
  


// Importing the router 
module.exports=router
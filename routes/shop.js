// Importing express module 
const express = require("express") 

//Router-level middleware works in the same way as application-level middleware
const router = express.Router() 

//import * as productController from '../controllers/shop';

const productController = require('../controllers/shop')

//console.log(productController);



router.route("/").get(productController.getHome); 


router.route("/about").get(productController.getAbout); 


router.route("/shop/product").get(productController.getProductList); 


//router.route("/shop/product/:productId").get(productController.getProductDetail); 

router.route("/shop/product-detail/:productId").get(productController.getProductDetail); 


router.route("/shop/cart-page").get(productController.getCart); 


router.route("/shop/create-cart").post(productController.postCart); 
//router.get("/contact", productController.getMain); 
  


// Importing the router 
module.exports=router
// Importing express module 
const express = require("express") 

const router = express.Router() 


//import * as adminController from '../controllers/admin';

const adminController = require('../controllers/admin')

console.log(adminController);



// Handling request using router 
router.route("/add-product").post(adminController.postAddProduct); 


router.route("/edit-product/:productId").post(adminController.postEditProduct); 



router.route("/add-product").get(adminController.getAddProduct); 


router.route("/edit-product/:productId").get(adminController.getEditProduct); 


router.route("/delete-product").post(adminController.postDeleteProduct); 


router.route("/delete-cart").post(adminController.postDeleteCartProduct); 


  


// Importing the router 
module.exports = router
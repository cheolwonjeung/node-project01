// Importing express module 
const express = require("express") 

const router = express.Router() 


//import * as adminController from '../controllers/admin';

const adminController = require('../controllers/admin')

console.log(adminController);



// Handling request using router 
router.route("/add-product").post(adminController.postAddProduct); 


router.route("/edit-product").post(adminController.postEditProduct); 



router.route("/add-product").get(adminController.getAddProduct); 


router.route("/edit-product").get(adminController.getEditProduct); 



  


// Importing the router 
module.exports = router
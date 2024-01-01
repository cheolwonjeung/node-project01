const Product = require('../models/product');

const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = require('../models/user');




const postAddProduct = (req, res, next) => {
    
   console.log(req.body);
   const addTitle = req.body.title
   const addDescription = req.body.description
   const addPrice = req.body.price
   const addDate = req.body.date

   
   console.log(Product);

   req.user.createProduct({
      title: addTitle,
      description: addDescription,
      price : addPrice,
      date : addDate

   })
   .then(result => {
      console.log("successfully create new product!")
      res.redirect('/')
   })
   .catch(err => console.log(err))


     
  //special method association is not working properly here..
  //createProduct, req.use is not working here.. not know why...
  
    

   //class constructor ---> 
   //const product = new Product(id, description, title, price);
    
   // product.save()
   // .then(()=> 
   // {console.log('successfully saving them into database')
   // res.redirect('/') }
   // )
   // .catch(err => console.log(err))
}



const postEditProduct = (req, res, next) => {

   const prodId = req.params.productId.split('')[1]
   const title = req.body.title
   const description = req.body.description
   const price = req.body.price
   const date = req.body.date

   console.log(prodId)
  Product.findByPk(prodId)
  .then(product => {

   console.log(product)
   console.log(product[0])

   product.title = title
   product.description = description
   product.price = price
   product.date = date

   return product.save()  ///대문자 Product or 소문자 product ???
   .then(result => {
      console.log('successfully editing product with sequelize!')
      res.redirect('/')
   })
   .catch(err => console.log(err))
  })
  .catch(err => console.log(err))


}



const getAddProduct = (req, res, next) => {


   res.render('admin/addProduct', {
   editMode : false,
   pageTitle : 'add-product_form',
   path : '/add-product'

   })

}

const getEditProduct = (req, res, next) => {
   
   const edit = req.query.edit
   console.log(edit);
   const prodId = req.params.productId.split("")[1]
   console.log(prodId)

   Product.findByPk(prodId)
   .then(product => {
      res.render('admin/addProduct', {
         pageTitle : 'edit-product_form',
         editMode : edit,
         prod: product,
         path : '/edit-product'   
         })
   })
   .catch(err => console.log(err))

}

//sequelize method "destroy" enable us to delete the product at the cart as well..!!
const postDeleteProduct = (req, res, next) =>  {
    
    const prodId = req.body.productId
    console.log(prodId);

    Product.findByPk(prodId)
    .then(product => {
      return product.destroy() 
       .then(result =>  {
         console.log('successfully destroy the product')
         res.redirect('/')
       })
       .catch(err => console.log(err))
    })
    .catch(err => console.log(err))


}



//when the user wants to delete his/her product at the cart..!
const postDeleteCartProduct = (req, res, next) => {

   const prodId = req.body.productId

   req.user
   .getCart()
   .then(cart => {
      return cart.getProducts({where : {id : prodId}})
   })
   .then(product => {
      return product.destroy()
      .then(result => {
         console.log('completely destroy the product at the cart!')
         res.redirect('/')
      })
      .catch(err => console.log(err))
   })
   .catch(err => console.log(err))


}






//declare multiple module.exports in Node.js


module.exports = {
   postAddProduct : postAddProduct,
   postEditProduct : postEditProduct,
   getAddProduct : getAddProduct,
   getEditProduct : getEditProduct,
   postDeleteProduct : postDeleteProduct,
   postDeleteCartProduct : postDeleteCartProduct
}



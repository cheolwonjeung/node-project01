const Product = require('../models/product');

const Sequelize = require('sequelize');

const sequelize = require('../utils/database');




const postAddProduct = (req, res, next) => {
    
   console.log(req.body);
   const addTitle = req.body.title
   const addDescription = req.body.description
   const addPrice = req.body.price
   const addDate = req.body.date

   req.user
   .createProduct({ 
      title: addTitle,
      description: addDescription,
      price : addPrice,
      date : addDate
   }).then(()=> 
    {console.log('successfully saving them into database using sequelize create')
    res.redirect('/') }
    )
    .catch(err => console.log(err))
    

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

   const title = req.body.title
   const description = req.body.description
   const price = req.body.price
   const date = req.body.date

  Product.findById(id)
  .then(product => {

   console.log(product)
   console.log(product[0])

   product[0].title = title
   product[0].description = description
   product[0].price = price
   product[0].date = date

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
   const prodId = req.params.productId
   Product.findById(prodId)
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



//declare multiple module.exports in Node.js


module.exports = {
   postAddProduct : postAddProduct(),
   postEditProduct : postEditProduct(),
   getAddProduct : getAddProduct(),
   getEditProduct : getEditProduct()
}



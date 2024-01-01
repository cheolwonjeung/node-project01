const Product = require('../models/product');

const Cart = require('../models/cart');

const User = require('../models/user');

const CartItem = require('../models/cart-item');



const getHome = (req, res, next) => {

 res.render('shop/home', {
     pageTitle : 'homepage',
     path : '/',
     
 })



// ... product fetchAll() model function -> this can be replaced by sequelize method!

//    Product.fetchAll()
//    .then((rows)=> {
    

//     console.log(rows[0][1]);    ///rows 로 학인해보는 작업..
//     //console.log([...rows][1])
//     //console.log([fields])
//     res.render('shop/home' ,{
//          path: 'shop/home',
//          pageTitle : 'homepage'

//     })
    
//     })
//     .catch(err => {console.log(err)})


}
   




const getAbout = (req, res, next) => {


     res.render('shop/about.ejs', {
 
         pageTitle : 'about-page',
         path: 'about',
     
        })



    }
 
 

const getProductList = (req, res, next) => {



    Product.findAll()
    .then(products => {
        //console.log(products)

        res.render('shop/product', {
         products: products,
         pageTitle : 'product-list-page',
         path: 'shop/product',

        })
    })
    .catch(err => console.log(err))



 // ... product fetchAll() model function -> this can be replaced by sequelize method!

    // Product.fetchAll()
    // .then((rows)=> {

    //     console.log(rows[0]);   //products 로 확인하는 작업...

    //     res.render('shop/product.ejs', {
    //         prod: rows[0],
    //         pageTitle : 'productPage',
    //         path: 'shop/product',
        
    //        })
    // })
    // .catch(err => console.log(err))
    

}


const getProductDetail = (req, res, next) => {

//const prodId = req.params.productId 
    
    const prodId = req.params.productId.split('')[1]
    console.log(prodId)

    Product.findByPk(prodId)
    .then(product => {
      console.log(product);

      res.render('shop/detail', {
        prod: product,
        pageTitle : 'product-detail-page',
        path: 'shop/product-detail/:${prodId}'

      })

    })
    .catch(err => console.log(err))


// ...fetchById() is no longer used -> can be replaced by sequelize method..

//    const prodId = req.params['id']
//    //console.log(prodId);
//    const id = prodId.split(':')[1];
//    console.log(id);
//    Product.fetchById(id)
//    .then((row)=> {

//     console.log(row[0][0]);

//     res.render('shop/detail', {
//         prod : row[0][0],
//         pageTitle : 'product-detail',
//         path: 'shop/product/${id}',
    
//        })
//    })
//    .catch(err=> console.log(err))
   
   
}



const getCart = (req, res, next) => {


req.user
.getCart()
.then(cart => {
    return cart.getProducts()
    .then(products => {
    
    res.render('shop/cart', {
        products : products,
        pageTitle : 'cart-page',
        path : 'shop/cart-page'
    })
    })
    .catch(err => console.log(err))
})

}


const postCart = (req, res, next) => {


    
    const prodId = req.body.productId
    console.log(prodId);
    let fetchedCart;

    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id : prodId}})
        .then(products => {
            console.log(products, "this is products")
            
            let newQuantity = 1
            let product
            if(products.length >0) {
                product = products[0]
                const oldQuantity = product.cartItem.quantity
                newQuantity = oldQuantity + 1
                //products.cartItem = {quantity : newQuantity}
            return fetchedCart.addProduct(product, { through : { quantity : newQuantity}  // sequelize 메소드를 사용함 addProduct 
        })
            .then(result => {
                Promise.resolve(result);
                console.log('quantity of product in cart get increased by 1')
                res.redirect('/shop/product')
            })
            .catch(err => console.log(err));
            } else {
                //products.cartItem = {quantity : newQuantity }
                return fetchedCart.addProduct(product, { through : { quantity : newQuantity}  // sequelize 메소드를 사용함 addProduct 
            })
                .then(result => {
                    Promise.resolve(result);
                    console.log('add new product to the Cart')
                    res.redirect('/shop/product')
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
                
    })
    .catch(err => console.log(err));

}




module.exports = {
    getHome : getHome, 
    getAbout : getAbout, 
    getProductList : getProductList, 
    getProductDetail : getProductDetail,
    getCart : getCart,
    postCart : postCart
}

//버튼에서 왜 post 방식과 get방식으로나뉘는지? 어떤 기준이 있는지? (데이터를 보낼때..)
const Product = require('../models/product');


const getHome = (req, res, next) => {

   Product.fetchAll()
   .then((rows)=> {
    

    console.log(rows[0][1]);    ///rows 로 학인해보는 작업..
    //console.log([...rows][1])
    //console.log([fields])
    res.render('shop/home' ,{
         path: 'shop/home',
         pageTitle : 'homepage'

    })
    // res.render('shop/home.ejs', {

    //     prod: rows,
    //     pageTitle : homepage1,
    //     path: '/',
    
    //    })
    })
    .catch(err => {console.log(err);})


}
   




const getAbout = (req, res, next) => {


     res.render('shop/about.ejs', {
 
         pageTitle : 'about-page',
         path: 'shop/about',
     
        })



    }
 
 



const getProductList = (req, res, next) => {


    Product.fetchAll()
    .then((rows)=> {

        console.log(rows[0]);   //products 로 확인하는 작업...

        res.render('shop/product.ejs', {
            prod: rows[0],
            pageTitle : 'productPage',
            path: 'shop/product',
        
           })
    })
    .catch(err => console.log(err))
    

}


const getProductDetail = (req, res, next) => {

   const prodId = req.params['id']
   //console.log(prodId);
   const id = prodId.split(':')[1];
   console.log(id);
   Product.fetchById(id)
   .then((row)=> {

    console.log(row[0][0]);

    res.render('shop/detail', {
        prod : row[0][0],
        pageTitle : 'product-detail',
        path: 'shop/product/${id}',
    
       })
   })
   .catch(err=> console.log(err))
   
   
}





module.exports = {
    getHome : getHome, 
    getAbout : getAbout, 
    getProductList : getProductList, 
    getProductDetail : getProductDetail
}

//버튼에서 왜 post 방식과 get방식으로나뉘는지? 어떤 기준이 있는지? (데이터를 보낼때..)
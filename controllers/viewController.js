const Product = require("../models/productModel");

exports.getHome = async (req,res,next) => {
    const products = await Product.find().limit(6);
    
    res.status(200).render('home',{
        products
    });
}

exports.getProduct = async (req,res,next) => {
    const slug = req.params.slug;
    try {
        const product = await Product.findOne({slug});
        if(!product){
            throw new Error("Page not found")
        }
        console.log(product.reviews);
        res.status(200).render('product',{
            title:product?.name,
            product
        });
    } catch (error) {
        res.status(200).json({"page":"Page Not Found"});
    }
}

exports.getProducts = async (req,res,next) => {
 
    const products = await Product.find({});
    res.status(200).render('product',{
        products
    });
}

exports.viewLogin = async (req,res,next) => {
    res.status(200).render('login');
    // res.json({'success':'yes'})
    // const products = await Product.find({});
    // res.status(200).render('product',{
    //     products
    // });
}

exports.aboutMe =  (req,res,next) => {
    res.status(200).render('aboutMe');
}

exports.addItem =  (req,res,next) => {
    res.status(200).render('addItem');
}
exports.cart =  (req,res,next) => {
    res.status(200).render('cart',{
        
    });
}

exports.getTypeProduct = (type) => {

    return async(req,res,next) => {
        try {
            const products = await Product.find({type});
            res.status(200).render('products',{
                title:type,
                products
            })
        } catch (error) {
            res.status(404).json({
                status:fail,
                error
            })
        }
    }
    // res.status(200).render('products');

}

// exports.getLaptop = async (req,res,next) => {
//    try {
//     // const laptops = await Product.find({type:'laptop'});
//     res.status(200).render('products')
//    } catch (error) {
//         res.status(404).json({
//             status:fail,
//             error
//         })
//    }

// }

exports.getAllProducts = async (req,res,next) => {
    try {
        const products = await Product.find({});

        res.render('allProducts',{
            products
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }
}
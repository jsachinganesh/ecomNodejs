const Product = require("../models/productModel");

exports.createReview = async(req,res,next)=>{
    const {rating,comment} = req.body;
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            throw new Error('Product not found')
        }

        // const alreadyReviewed = product.reviews.find()

        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }


        product.reviews.push(review)
        product.numReviews = product.reviews.length

        await product.save();
        res.json({'status':'success'})

    } catch (error) {
       res.json({
           'status':'fail',
           message:error.message
       })
    }
}

exports.getReviewsByProductID = async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id).select('reviews');
        res.json({'status':product.reviews})

    } catch (error) {
        res.json({
            'status':'fail',
            message:error.message
        })
    }
}
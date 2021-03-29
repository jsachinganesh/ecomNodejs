const Product = require("../models/productModel")

exports.addProduct = async (req,res,next) => {
    try {
        const {name,brand,price,ratings,manufacturer,modelName,ramSize,memoryStorageCapacity,resolution,graphicsCard,type} = req.body
    
        const newProduct = await Product.create({
            name,brand,price,ratings,manufacturer,modelName,ramSize,memoryStorageCapacity,resolution,graphicsCard,type
        });
        console.log(req.file?.filename);
        

        res.status(200).json({
            status:'success',
            data:newProduct
        })
    } catch (error) {
        console.log(req.body);
        console.log(error.message);
        res.status(404).json({
            status:'fail',
            error:error.message
        })
    }
}

exports.getAllProducts =  async (req,res,next) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json({
            status:'success',
            length:allProducts.length,
            data:allProducts
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }
}

exports.update = async (req,res,next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id,updates,{
            new:true
        })
        res.status(200).json({
            status:'success',
            data:updatedProduct
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }
}

exports.getProduct = async (req,res,next) => {
    try {
        const id = req.params.id;
        
        const product = await Product.findById(id)
        res.status(200).json({
            status:'success',
            data:product
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }
}

exports.deleteProduct = async (req,res,next) => {
    try {
        const id = req.params.id;
        
        await Product.findByIdAndDelete(id)
        res.status(204).json({
            status:'success'
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }
}

exports.doSearch = async (req,res,next) => {

    try {
        const item = req.params.item;
        
        const results = await Product.find({$text: {$search: item}}).limit(3)
        
        res.status(200).json({
            status:'success',
            length:results.length,
            data:results
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }

}

// async function getProductByType(req,res,next,type){

// }

exports.getProductByType = (type) => {
    return async(req,res,next) => {
        try {
            const data = await Product.find({type});
            res.status(200).json({
                status:'success',
                length:data.length,
                data
            })
        } catch (error) {
            res.status(404).json({
                status:fail,
                error
            })
        }
    }
}
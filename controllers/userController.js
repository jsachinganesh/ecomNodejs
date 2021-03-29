const User = require("../models/userModel")
// const authController = require('./userController');

const multer = require('multer');
const sharp = require('sharp');

exports.getAllUsers =  async (req,res,next) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json({
            status:'success',
            data:allUsers
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }
    
}

exports.updateMe = async (req,res,next) =>{
    try {
        if(req.body.password){
            req.body.password = null;
        }
        
        const id = req.user._id;
        const user = await User.findById(id);
      
        if(!user){
            throw new Error("No user")
        }

        if(req.body.name){
            user.name = req.body.name;
        }

        if(req.body.email && user.isEmail(req.body.email)){
            user.email = req.body.email;
        }

        user.save({ validateBeforeSave: false })
        
        res.status(200).json({
            status:'success',
            data:user
        })
    } catch (error) {
        res.status(404).json({
            status:fail,
            error
        })
    }
}

exports.aboutMe = (req,res,next) => {
    res.status(200).json({
        status:'success',
        data:req.user
    })
}

const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        // cb(new AppError('This is not an image! Please upload Image',400),false);
        return res.status(400).json({
            status:'fail',
            message:'This is not an image! Please upload Image'
        })
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});

exports.uploadUsersPhoto = upload.single('image');
exports.resizeUserPhoto = async (req,res,next) => {
    try {
            if(!req.file) return next();
        req.file.filename = `user-${req.user._id}-${Date.now()}.jpg`;
        await sharp(req.file.buffer).resize(500,500).toFormat('jpg').jpeg({quality:90}).toFile(`public/images/products/${req.file.filename}`);
    } catch (error) {
        res.json({
            'success':'fail',
            "message":error.message
        })
    }

    next();
}

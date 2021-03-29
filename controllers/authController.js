const User = require("../models/userModel")
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly:true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
}

exports.signUp = async (req,res,next) => {
 
    try {
        const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm,
            favThing:req.body.favThing,
            favMovie:req.body.favMovie,
        });
        res.status(200).json({
            status:'success',
            data:newUser
        })
    } catch (error) {
        res.status(404).json({
            status:'fail',
            error
        })
    }
}

exports.login = async (req,res,next) => {
   
    try {
        const {email,password} = req.body;
        if(!email || !password){
            throw new Error('no email or no password')
        }

        const user = await  User.findOne({email}).select('+password');

        if(!user){
            throw new Error('No User avable with that email')
        }

        const checkingUser = await user.correctPassword(password,user.password);

        if(!checkingUser){
            throw new Error('passwword is incorrect')
        }

        createSendToken(user,200,res);


    } catch (error) {
        res.status(404).json({
            status:'fail',
            error:error.message
        });
    }
}

exports.isLoggedIn = async (req,res,next) => {
    if(req.cookies?.jwt){
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );
        
              // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            res.locals.user = currentUser;
            return next();

        } catch {
           
            return next();
        }
    }
    console.log(req.cookies);
    next();
}

exports.protect = async (req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else if(req.cookies.jwt){
            token = req.cookies.jwt;
        }

        if(!token){
            throw new Error('Please Login to access this page')
        }

        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            throw new Error('The user belonging to this token does no longer exist.')
        }

        req.user = currentUser;
        res.locals.user = currentUser;
        next();

    } catch (error) {
        res.status(404).json({
            status:'fail',
            error:error.message
        });
    }
}


exports.logout = (req,res) => {
    res.cookie('jwt','loggedout',{
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly:true
    });
  
    res.status(200).json({status:'success'});
};

exports.updatePassword = async(req,res,next) => {
    try {
        const user = req.user;
        const {password,updatePassword,updatePasswordConform} = req.body;
      
        if(!password || !updatePassword || !updatePasswordConform){
            throw new Error('Invalid Input');
        }
        const userPass = await User.findById(req.user._id).select('+password');
      
        if(!await user.correctPassword(password,userPass.password)){
            throw new Error('InCorrect Password');
        }

        if(updatePassword != updatePasswordConform){
            throw new Error("Incorrect updatePassword");
        }

        userPass.password = updatePassword;
        userPass.passwordConfirm = updatePasswordConform;

        userPass.save();

        // user.password = null;
        res.json({
            status:'success'
        })

    } catch (error) {
        res.json({
            status:'fail',
            message:error.message
        })
    }
}

exports.restrictTo = (admin) => {
    return (req,res,next) => {
        if(admin != req.user.role){
            return res.json({"status":"You'r not authorized to access this page"})
        }
        next();
    }
}
const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'name is must'],
            trim:true
        },
        email:{
            type:String,
            required:[true,'email is must'],
            unique:true,
            validotor:[validator.isEmail,'Incorrect Email']
        },
        password:{
            type:String,
            required:[true,'A user must have a password'],
            minlength:4,
            select:false
        },
        passwordConfirm:{
            type:String,
            required:[true,'A user must password confirm'],
            validate:{
                // validator works on create and save only
                validator: function(val){
                    return this.password === val;
                },
                message:"Password Confirm can't match"
            }
        },
        role:{
            type:String,
            enum:['admin','user'],
            default:'user'
        },
        favThing:{
            type:String,
            required:[true,'A user must have fav thing'],
            select:false
        },
        favMovie:{
            type:String,
            required:[true,'A user must have fav movie'],
            select:false
        }
    }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);;
}

userSchema.methods.isEmail = function(email){
    return validator.isEmail(email);
}

const User = mongoose.model('User',userSchema);
module.exports = User;
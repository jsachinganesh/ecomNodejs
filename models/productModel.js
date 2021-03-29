const mongoose = require('mongoose');
const slugify = require('slugify');
const Review = require('./reviewModel');



const productSchema = mongoose.Schema(
    {
        name: {
          type: String,
          required:[true,'name is must']
        },
        brand: {
          type: String,
          required:[true,'A product must have brand']
        },
        price: {
          type: Number,
          required:[true,'A product must have price']
        },
        ratings: {
          type: Number,
          default:4,
          min:0,
          max:5
        },
        manufacturer: {
          type: String,
          required:[true,'A product must have manufacturer']
        },
        modelName: {
          type: String,
          required:[true,'A product must have modelName']
        },
        ramSize: {
          type: Number,
          required:[true,'A product must have ramSize']
        },
        memoryStorageCapacity: {
          type: String,
          required:[true,'A product must have memoryStorageCapacity']
        },
        resolution: {
          type: String,
          required:[true,'A product must have resolution']
        },
        graphicsCard: {
          type: String,
          required:[true,'A product must have graphicsCard']
        },
        image: {
          type: String,
          default:"default"
        },
        type: {
          type: String,
          required:[true,'A product must have type']
        },
        slug:String,
        reviews: [Review],
        numReviews: {
          type: Number,
          required: true,
          default: 0,
        },
    }
)
productSchema.index({name: 'text'});
productSchema.pre('save',function(next){
  this.slug = slugify(this.name,{lower:true});
  next();
});
const Product = mongoose.model('product',productSchema);
module.exports = Product;
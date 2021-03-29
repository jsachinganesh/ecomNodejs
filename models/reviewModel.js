const mongoose = require('mongoose');
const slugify = require('slugify');

const reviewSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required:[true,'name is must']
      },
      rating: {
        type: Number,
        required:[true,'rating is must']
      },
      comment: {
        type: String,
        required:[true,'nacommentme is must']
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
      }
    },{
      timestamps:true
    }
)

// const Review = mongoose.model('Review',reviewSchema);
module.exports = reviewSchema;

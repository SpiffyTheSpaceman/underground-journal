var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   googleId: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   email: String,
   age: Number,
   gender: {
      type: String,
      enum: ['Male', 'Female', 'NonBinary']
   },
   banned: {
      type: Boolean,
      default: false,
   },
   posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
   }],
   postsLiked: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
   }],
   usersFollowed: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   comments: {
      type: String,
   }
 }, {
   timestamps: true
 });



 module.exports = mongoose.model("User", userSchema);
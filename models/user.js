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
   posts: [postSchema],
   postsLiked: {
      type: String,
   },
   usersFollowed: {
      type: String,
   },
   comments: {
      type: String,
   }
 }, {
   timestamps: true
 });

 var postSchema = new Schema ({
   title: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
   },
   entry: {
      type: String,
      required: true,
   }
 })

 module.exports = mongoose.model("User", userSchema);
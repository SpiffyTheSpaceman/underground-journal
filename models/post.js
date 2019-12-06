var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
   index: {
      type: Number,
      required: true,
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   date: {
      type: Date,
      default: function() {
         let newDate = new Date();
         return newDate;
      }
   },
   dateTranslated: {
      type: String,
   },
   entry: {
      type: String,
      required: true,
   },
   likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
});



var postSchema = new Schema ({
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   title: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: function() {
         let newDate = new Date();
         return newDate;
      }
   },
   dateValue: {
      type: String
   },
   dateTranslated: {
      type: String,
   },
   entry: {
      type: String,
      required: true,
   },
   hidden: {
      type: Boolean,
      required: true,
      default: true,
   },
   nameHidden: {
      type: Boolean,
      default: true,
   },
   comments: {
      type: [commentSchema],
      ref: 'User'
   },

 })

module.exports = mongoose.model("Post", postSchema);
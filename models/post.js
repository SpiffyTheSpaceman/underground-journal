var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
   }

 })

module.exports = mongoose.model("Post", postSchema);
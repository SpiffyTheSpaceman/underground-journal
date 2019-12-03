var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema ({
   owner: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
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

module.exports = mongoose.model("Post", postSchema);
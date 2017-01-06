var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
  timestamp:true
});

var Posts = mongoose.model('Post',postSchema);

module.exports = Posts;

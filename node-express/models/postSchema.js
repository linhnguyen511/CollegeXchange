var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    imagePath:{
        type: String,      
    },
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
  timestamps:true
});

var Posts = mongoose.model('Post',postSchema);

module.exports = Posts;

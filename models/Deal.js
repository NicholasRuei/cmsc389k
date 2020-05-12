var mongoose = require('mongoose'); 
mongoose.Promise = global.Promise

var reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 0.0,
        max: 5.0,
        required: false
    },
    comment: {
        type: String, 
        required: false
    }
}); 


//Let's define a second schema 

var dealSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    tags:{
        type: [String],
        required: true 
    },
    store:{
        type: String,
        required: true 
    },
    location:{
        type: String,
        required: true, 
    },
    reviews:[reviewSchema]
});

var Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal; 
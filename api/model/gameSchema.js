const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    title: {
        type:String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'title is required']
    },
    year:{
        type:String,
        required: [true,'year is required']
    },
    players: {
        type:Number,
        min:2,
        max:12,
        default:2
    },
    publisher:{
        name: {
            type:String,
            minlength:3,
            maxlength:50
        },
        country: {
            type: String,
           // enum: ['USA','France','Germany','Afghanistan','Japan'],
           // default: 'Afghanistan'
        }
    },
    reviews: [{
        name: {
            type:String,
            minlength: 3, 
            maxlength: 50
        },
        date: {
            type: Date,
            default : Date.now
        }
    }]
});

mongoose.model('Game',gameSchema,'games');


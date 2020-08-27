const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
     image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },   
	quantity: {
	    type: Number,
	    required: true,
	    trim: true,
	}, 
    timings_id: {
    	type: Number,
        required: true,
    },
     available: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})


const food = mongoose.model('food', foodSchema)

module.exports = food

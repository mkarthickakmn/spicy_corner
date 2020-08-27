const mongoose = require('mongoose');

const timingSchema = new mongoose.Schema({
    timings_id: {
        type: Number,
        required: true,
        trim: true
    },
     type: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    s_time: {
        type: Number,
        required: true,
        trim: true,
    },   
	e_time: {
	    type: Number,
	    required: true,
	    trim: true,
	}, 

})





const timings = mongoose.model('timings', timingSchema)

module.exports = timings

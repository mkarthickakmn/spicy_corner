const mongoose = require('mongoose');
const Food=require('./food');
const orderSchema = new mongoose.Schema({
    
    food: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'food',
    },
    order_status: {
        type: String,
        required: true,
        trim: true
    },   
	order_quantity: {
	    type: Number,
	    required: true,
	    trim: true,
	}, 
    user_id: {
    	type: mongoose.Schema.ObjectId,
    	ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

// orderSchema.pre('save', async function (next) {
//     const order = this;
//     let food=await Food.findOne({_id:order.food});
//     food.quantity=food.quantity-order.order_quantity;
//     food.save();
//     next();
// })



const Order = mongoose.model('Order', orderSchema)

module.exports = Order
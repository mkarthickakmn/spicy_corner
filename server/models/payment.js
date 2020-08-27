const mongoose = require('mongoose');
const Order=require('./orders');
const Food=require('./food');

const paySchema = new mongoose.Schema({    
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
     payMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },   
	orders: 
	    [
            {
                type:mongoose.Schema.Types.ObjectId,ref: 'Order'
            },
        ]
	
}, {
    timestamps: true
})


paySchema.pre('save', async function (next) {
    const order=this;
    const doc=await Order.find( { _id: { $in: order.orders } })
    console.log("orders");
    console.log(doc);
    doc.forEach(async(orders)=>{
        food=await Food.findOne({_id:orders.food});
        food.quantity=food.quantity-orders.order_quantity;
        if(food.quantity==0)
            food.available=0;
        await food.save();
    })

    next();
})


const Payment = mongoose.model('payment', paySchema)

module.exports = Payment

const mongoose = require('mongoose');
const Order=require('./orders');
const Food=require('./food');
const User=require('./users');
const {transporter,paymentMail,adminMail}=require('../email/email');

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
     delivery_address: {
        type: String,
        required: true,
        trim: true
    },
     userphone: {
        type: Number,
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
    let payment_order='';
    let bill=[];
    foodOrder={itemno:'',OrderedItems:'',Price:''};
    const doc=await Order.find( { _id: { $in: order.orders } })
    let i=1;
    doc.forEach(async(orders)=>{
        food=await Food.findOne({_id:orders.food});
        food.quantity=food.quantity-orders.order_quantity;
        if(food.quantity==0)
            food.available=0;
        foodOrder.itemno=i;
        foodOrder.OrderedItems=food.name+" x"+orders.order_quantity;
        foodOrder.Price=food.amount*orders.order_quantity;
        i++;
        bill.push(foodOrder);
        foodOrder={};
        payment_order+=food.name+" x"+orders.order_quantity+",";
        await food.save();
    })


    const user=await User.findOne( { _id: order.user_id });
    
    await transporter.sendMail(adminMail(bill,user.username,user.userEmail,order.price), function(error, info){
      if (error) 
      {
        console.log(error);
      } 
      else
      {
        console.log('Email sent: ' + info.response);
      }
    });

    await transporter.sendMail(paymentMail(bill,user.username,user.userEmail,order.price), function(error, info){
      if (error) 
      {
        console.log(error);
      } 
      else
      {
        console.log('Email sent: ' + info.response);
      }
    });

    next();
})


const Payment = mongoose.model('payment', paySchema)

module.exports = Payment

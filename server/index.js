var express=require('express');
require('./db/mongoose');
var path=require('path');
const favicon = require('express-favicon');
const cors = require('cors');
var nodemailer = require('nodemailer');
var app=express();
app.use(express.json())
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const User=require('./models/users');
const Food= require('./models/food');
const Timings=require('./models/timings');
const Order=require('./models/orders');
const Payment=require('./models/payment');
const port = process.env.PORT || 3000;
var otp='';

app.use(favicon(path.join(__dirname ,'../','spicy_corner.png')));
console.log(path.join(__dirname ,'../', '/dist/SpicyCornerRestaurant'));
console.log(path.join(__dirname ,'../', '/dist/SpicyCornerRestaurant/index.html'));

app.use(express.static(path.join(__dirname ,'../', '/dist/SpicyCornerRestaurant')));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname ,'../', '/dist/SpicyCornerRestaurant/index.html'));
});

// default Heroku PORT
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})


app.post('/login',async(req,res)=>{

	console.log(req.body);
    const user = await User.findByCredentials(req.body.user.userEmail,req.body.user.userpassword);
    if(user.error=="not registered")
    	res.status(401).send();
    else if(user.error=="invalid credentials")
    	res.status(502).send();
    else
    	res.send([user]);

});

app.post('/register',async(req,res)=>{
   const user = new User(req.body.user);
 
	await user.save(function(err, user) {
	    if (err) 
	    {
	    	console.log(err);
	        if(err._message== 'User validation failed')
		    	res.status(502).send();
		 	else
   		 		res.status(403).send()
	    }
	    else
    		res.status(201).send();

    })
    		
});

app.post('/sendOtp',async(req,res)=>{

	var val = Math.floor(1000 + Math.random() * 9000);
	console.log(val);
	var email=req.body.email;
	var transporter = nodemailer.createTransport({
				  service: 'gmail',
				  auth: {
				    user: 'mkarthickakmn@gmail.com',
				    pass: 'karthickakmn1249'
				  }
				});

				var mailOptions = {
				  from: 'mkarthickakmn@gmail.com',
				  to: email,
				  subject: 'OTP Spicy Corner',
				  text: 'Your otp is '+val
				};

				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
				  	console.log("error");
				    console.log(error);
				    res.sendStatus(503);
				  } else {
				    console.log('Email sent: ' + info.response);
				    otp=val;
					res.send({timer:30});
				  }
				});
})


app.post('/subOtp',function(req,res)
{
	if(req.body.otp==otp)
	{
		console.log("otp matched");
		res.send('');
	}
	else if(req.body.otp=="")
	{
		otp="";
	}
	else
	{
		res.sendStatus(400);
	}
})



app.post('/updatePwd',async(req,res)=>{

	var email=req.body.email;
	var pwd=req.body.pwd;
	try
	{
		const user=await User.findOne({userEmail:email});
	 	user.userpassword=pwd;
	 	await user.save();
	 	res.status(201).send();
	 }catch(e){throw e}; 
})

app.post('/food',async (req,res)=>{
	try
	{
		const food=await Food.find({available:1});	
		res.send(food);
	}
	catch(e){throw e}
});



app.post('/insertNewOrders',async (req,res)=>{
 
	const order = new Order({user_id:req.body.user_id,
						   food:req.body.id,
						   order_quantity:req.body.quantity,
						   order_status:req.body.status});
 
	await order.save(function(err, order) {
	    if (err) 
	    {
	    	console.log(err);
	    }
	    else
    	{
    		res.status(201).send([order]);
    	}

    })
});

app.post('/updateNewOrders',async (req,res)=>{
	const filter = { order_status:'New Orders',user_id:req.body.user_id};
	const update = {  food:req.body.id,
					   order_quantity:req.body.quantity,
					   order_status:req.body.status 
					};
	try
		{
			let order = await Order.findOneAndUpdate(filter, update);
			if(order)
				res.status(201).send([order]);
		}
		catch(e){throw e}
	});

app.post('/insertCartOrders',async (req,res)=>{

	const order = new Order({user_id:req.body.user_id,
						   food:req.body.id,
						   order_quantity:req.body.quantity,
						   order_status:req.body.status});
 
	await order.save(function(err, order) {
	    if (err) 
	    {
	    	console.log(err);
	    }
	    else
    	{    		
    		res.status(201).send([order]);
    	}

    })
});

app.post('/getOrders',async (req,res)=>{
	try
	{
		const orders=await Order.find(req.body).populate('food')
	    .populate('user_id')
	    .exec(function (err, results) {
	        if(err) throw err;
	        res.status(201).send(results);
	    });
	}
	catch(e){throw e}
});

app.post('/getOrderByType',async (req,res)=>{
	if(req.body.menu=='Ordered Items')
	{ 
		try
		{
			const orders=await Order.find(
			{$and: [
			          { $or: [{order_status: 'Ordered Items'}, {order_status: 'delivered'}] },
			          {user_id:req.body.id}
     		 ]})
			.populate('food')
	    .exec(function (err, results) {
	        if(err) throw err;
	        res.status(201).send(results);
	    });
			
		}
		catch(e){throw e}
	}
	else
	{
		try
		{
			const orders=await Order.find({order_status:req.body.menu,user_id:req.body.id})
			.populate('food')
	    .exec(function (err, results) {
	        if(err) throw err;
	        res.status(201).send(results);
	    });
			
		}
		catch(e){throw e}
	}

});


app.post('/moveOrders',async(req,res)=>{

	try
	{
		const order =await Order.findOne({_id:req.body.id})	
		if(order.order_status=="New Orders")
			 update = { 
					   	order_status:"CartOrders",
						};
		else
			 update = { 
					   	order_status:"New Orders",
						};
		const filter = {_id:req.body.id};
		let updated_order = await Order.findOneAndUpdate(filter, update);
		if(updated_order)
			res.status(201).send([updated_order]);
	}
	catch(e){throw e}
	
})

app.post('/updateQuantity',async (req,res)=>{

	var quantity=req.body.quantity;
	const filter = {_id:req.body.id};
	const update = { 
					   order_quantity:req.body.quantity,
					};
	try
		{
			let order = await Order.findOneAndUpdate(filter, update, {
 				 new: true
			});
			
			await Food.findOne({_id:order.food},async function(err,food){

				if(food.quantity==0)
				{
					console.log("quan");
					food.available=0;
					console.log(food);
					await food.save(); 
				}	
			});

			res.status(201).send([order]);
		}
		catch(e){throw e}
	
	
});


app.post('/delete_order',async (req,res)=>{

	var id=req.body.id;
	try
		{
			let order = await Order.findOne({_id:req.body.id}).remove();
			if(order)
				res.status(201).send([order]);
		}
		catch(e){throw e}
	
	
});

app.post('/setToOrdered',async(req,res)=>{

	var orders=(req.body.orders);
	var order_array=[];
	var i=0;
	while(i<orders.length)
	{

		order_array[i]=orders[i]._id;
		i++;
	}
	try
	{
		let new_order=await Order.updateMany(
		   { _id: { $in: order_array } },
		   { $set: { order_status : 'Ordered Items' } },
		   {multi: true}
		)
		res.status(201).send(new_order);
	}catch(e){throw e};
})

app.post('/pay',async(req,res)=>{

	// console.log(req.body);
	var orders=(req.body.order);
	var order_array=[];
	var i=0;
	
	while(i<orders.length)
	{

		order_array[i]=orders[i]._id;
		i++;
	}
	try
	{
		let payment=await new Payment({user_id:req.body.id,
					price:req.body.price,
					payMethod:req.body.payMethod,
					status:'Not delivered',
					orders:order_array
					}).save();
	
		res.status(201).send();
	}catch(e){throw e};
})

app.post('/cancel',async(req,res)=>{

	var orders=(req.body.orders);
	var order_array=[];
	var i=0;
	while(i<orders.length)
	{

		order_array[i]=orders[i]._id;
		i++;
	}
	try
	{
		await Order.deleteMany( {_id: { $in: order_array } } );
		res.status(201).send();
	}
	catch(e){throw e}
});

app.post('/saveAddress',async(req,res)=>{

	try
	{
		let user=await User.findOne({userEmail:req.body.email});
		user.address=req.body.form.address;
		user.phone=req.body.form.phone;
		await user.save();
		console.log(user);
		res.status(201).send([user]);
	}catch(e){throw e};

});


///////////admin////////////
app.post('/getUser',async(req,res)=>{

	const users=await User.find({ userEmail: { $ne: 'mkarthickakmn@gmail.com' } })
	res.status(201).send(users);	
});


app.post('/getfood',async (req,res)=>{

	Food.find({}).sort({'timings_id': 1}).exec(function(err, food)
	 {
	 	if(err) throw err;
	 	res.status(201).send(food); 
	 });
});


app.post('/addfood',async (req,res)=>{

	const food=new Food({...req.body.food,available:1});
	try
	{
		await food.save();
	}
	catch(e){throw e}
	res.status(201).send();
})

app.post('/updatefood',async(req,res)=>{

	var food=req.body.food;
	var img_change=req.body.image_change;
	 var update={}
	if(img_change==0)
	{
		update={
				name:food.name,
				description:food.description,
				amount:food.amount,
				quantity:food.quantity,
				timings_id:food.timings_id,
				available:food.available
				}	
	}
	// else
	// {

	// 	food.image=food.image.slice(22);
	// 	// console.log(food.image);
	// 	var buffer = new Buffer(food.image, 'base64');
	// 	var today=new Date().getUTCMilliseconds();	
	// 	var file_name='!';
	// 	file_name += (today + Math.random() + 1).toString(36).substring(7) + (today + Math.random() + 2).toString(36).substring(7) + (today + Math.random() + 3).toString(36).substring(7);
	// 	file_name = file_name + '.jpg';

	// 	var savePath = path.resolve(__dirname + '/images/' + file_name);
	// 	console.log('PATH: ' + savePath);
		
	// 	fs.writeFileSync(savePath, buffer);
	// 	 var update={
	// 		name:food.name,
	// 		description:food.description,
	// 		image:file_name,
	// 		amount:food.amount,
	// 		quantity:food.quantity,
	// 		timings_id:food.timings_id,
	// 		available:food.available
	// 	}
			
	// }
	var filter={_id:food._id};			
	try
		{
			let food = await Food.findOneAndUpdate(filter, update, {
 				 new: true
			});
			res.status(201).send([food]);
		}
		catch(e){throw e}
});

app.post('/delfood',async(req,res)=>{


	var id=req.body.food._id.toString();
	try
		{
			let food = await Food.deleteOne({_id:id});
			if(food)
				res.status(201).send(food);
		}
		catch(e){throw e}
	
});

app.post('/search_category',async(req,res)=>{

	var id=req.body.category;
	let food;
	try
		{
			if(id==0)
				food = await Food.find({});
			else
				food = await Food.find({timings_id:id});
			if(food)
				res.status(201).send(food);
		}
		catch(e){throw e}
});

app.post('/view_Orders',async(req,res)=>{
	try
		{
			let payment = await Payment.find({status:'Not delivered'}).sort({createdAt : -1}).populate({
				path:'orders',
				model:'Order',
				populate:{
					path:'food',
					model:'food'
				}
			}).populate('user_id') 
			.exec(function(err, payment){
			    //do stuff
				res.send(payment);
			});
			
		}
		catch(e){throw e}
})


app.post('/pay_status',async(req,res)=>{

console.log(req.body);

	var order_id=req.body.order_id;

	try
	{
		 await Payment.findOneAndUpdate({_id:req.body.id},{status:'delivered'});
		 await Order.updateMany(
			   { _id: { $in: order_id } },
			   { $set: { order_status : 'delivered' } },
			   {multi: true}
			)
		 res.status(201).send();

	}catch(e){throw e};
});

app.post('/view_delivered',async(req,res)=>{
	try
		{
			let payment = await Payment.find({status:'delivered'}).sort({createdAt : -1}).populate({
				path:'orders',
				model:'Order',
				populate:{
					path:'food',
					model:'food'
				}
			}).populate('user_id') 
			.exec(function(err, payment){
			    //do stuff
				res.send(payment);
			});
			
		}
		catch(e){throw e}

})


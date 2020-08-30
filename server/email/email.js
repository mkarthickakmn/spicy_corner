var nodemailer = require('nodemailer');
var path=require('path');

var transporter = nodemailer.createTransport({
				  service: 'gmail',
				  auth: {
				    user: 'mkarthickakmn@gmail.com',
				    pass: 'karthickakmn1249'
				  }
				});

const otpmail=(email,val)=>{
	var mailOptions = {
	  from: 'mkarthickakmn@gmail.com',
	  to: email,
	  subject: 'OTP Spicy Corner',
	  html: '<p><img src="cid:unique@kreata.ee" style="width:50px;"/><h3>Welcome to the SpicyCorner,</h3> <b>Your otp code is '+val+'.</b></p>',
	  attachments: [{
					     filename: 'Logo.png',
					     path: path.join(__dirname ,'../../','spicy_corner.png'),
					     cid: 'unique@kreata.ee' 
					}],
	 
	};
	return mailOptions;
}	
	
const paymentMail=(bill,email,total)=>{
	console.log("bill");
	console.log(bill);
	let message = (
				  '<table style="border:1px solid black;padding:8px;">' +
				  '<tr>' +
				  '<th> S.No </th>' +
				  '<th> Item </th>'  +
				  '<th> Price </th>'  +
				  '</tr>'
				); 

	bill.forEach(function (food) {
message += (
     '<tr>' +
      '<td>' + food.itemno + '</td>' +
      '<td>' + food.OrderedItems + '</td>' +
      '<td>' + food.Price + '</td>' +
    '</tr>'
   );
});

   

message +=  '<td><b>Total</b></td><td colspan="2" style="text-align:center"><b>'+total+'</b></td></table>';
message+="<div>Your Orders are successfully placed and will deliver to you at the right time...Thanks!!!</div>"

	var mailOptions = {
	  from:'mkarthickakmn@gmail.com',
	  to: email,
	  subject: 'Thankyou for ordering SpicyCOrner!!!',
	  html: '<p><img src="cid:unique@kreata.ee" style="width:50px;"/><h3>Welcome to the SpicyCorner</h3>,\
	  <div>'+message+'</div>',
	  attachments: [{
					     filename: 'Logo.png',
					     path: path.join(__dirname ,'../../','spicy_corner.png'),
					     cid: 'unique@kreata.ee' 
					}],
	 
	};
	return mailOptions;
}	

module.exports={
					transporter,
					 otpmail,
					 paymentMail
				};
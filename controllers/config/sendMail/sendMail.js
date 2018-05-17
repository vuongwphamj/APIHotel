const nodemailer = require('nodemailer');

module.exports.send = (sendTo, title, html) => {
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'softsoft1452@gmail.com',
	    pass: 'Pp123321?z'
	  }
	});

	var mailOptions = {
	  from: 'softsoft@gmail.com',
	  to: sendTo,
	  subject: title,	
	  html: html
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    reject(error);
		  } else {
		    // console.log('Email sent: ' + info.response);
		    resolve(info)
		  }
		});
	});
}


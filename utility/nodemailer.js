const nodemailer = require('nodemailer'); 

let sendMail=(rec, sub,body)=>{
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'yourmail@gmail.com', 
        pass: '*******' //your gmail pass
    } 
}); 
  
let mailDetails = { 
    from: 'yourmail@gmail.com', 
    to: rec, 
    subject: sub, 
    text: body
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log(err); 
    } else { 
        console.log('Email sent successfully'); 
    } 
});
}

module.exports={sendMail}
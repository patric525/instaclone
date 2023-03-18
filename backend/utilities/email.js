const nodemailer = require('nodemailer')

const sendmail = (email , subject , otp)=>{
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: "",
          pass:""

        }
      });
    
    const mailoptions ={
            from: '', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: otp, // plain text body
    }
    
    transport.sendMail(mailoptions , function(err , info){
        if(err){
            console.log(err);
        }
        else{
            console.log('email sent');
        }
    })

}

module.exports=sendmail

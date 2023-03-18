const nodemailer = require('nodemailer')

const problem = (email , subject ,problem)=>{
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: "",
          pass:""

        }
      });
    
    const mailoptions ={
            from: email, // sender address
            to: '', // list of receivers
            subject: subject, // Subject line
            text: problem, // plain text body
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

module.exports=problem

const nodemailer = require('nodemailer');

const mailgen = require("mailgen")

const signUp = async (req, res) => {
  try {
    // Create a test SMTP account for Ethereal email
    let testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the Ethereal test SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // Use the correct user from testAccount
        pass: testAccount.pass, // Use the correct pass from testAccount
      },
    });

    // Email message options
    let message = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Success fully registered with us", // plain text body
      html: "<b>Success fully registered with us</b>", // html body
    };

    // Send email using transporter
    let info = await transporter.sendMail(message);

    res.status(201).json({
      msg: "You have received an email",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    // Catch any errors during the email sending process
    return res.status(500).json({ err });
  }
};

const getBill = (req, res) => {
    
console.log(process.env.EMAIL,"------------",process.env.PASSWORD,)
    const { userEmail} = req.body;

    let config = {
        service : 'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
            
        }
        
    }
 console.log(config)
    let transporter = nodemailer.createTransport(config);
    let mailgenarater =  new mailgen({
        theme:"default",
        product:{
            name:"mailgen",
            link:"https://mailgen.js/ "
        }
    })
    let response = {
        body:{
            name:"Ramya",
            intro:"Your bill has arrived",
            table:{
                data: [
                   {
                    item:"Node mailer stack Book",
                    description:"A Backend application",
                    price:"100 Rs"
                   }
                ]
            },
            outro:"Looking forward to do more business"
        }
    }

    let mail = mailgenarater.generate(response);

    let message = {
        from:process.env.EMAIL,
        to:userEmail,
        subject:"Place Order",
        html:mail
    }

    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            msg:"You should receive an Email"
        })
    }).catch(err =>
   {
    return res.status(500).json({ err });
   })

//   res.status(201).json("Success");
};

module.exports = {
  signUp,
  getBill,
};

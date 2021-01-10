const nodemailer = require("nodemailer");

export async function sendMail(email, pass) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {       
        user: 'sm7518028@gmail.com', 
        pass: 'asdfg555', 
    },
  });

  let info = await transporter.passRestore({
    from: '"System information for user" <sm7518028@gmail.com>', 
    to: `${email}`, 
    subject: "You forget your password. Do you want restore it? ", 
    html: `Your hashPass: <a href='http://localhost:3000/forgetpass/${pass}'>Link for password recovery</a> <br/> <b>Dont forget it.</b>`, 
  });

  console.log("Message sent: %s", info.messageId);
  return pass
}

export async function mailAboutNewOffer(userInfo, offerInfo, moderEmail) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {       
        user: 'sm7518028@gmail.com', 
        pass: 'asdfg555', 
    },
  });

  let info = await transporter.sendMail({
    from: '"System information for moderator" <sm7518028@gmail.com>', 
    to: `${moderEmail}`, 
    subject: `${userInfo.firstName} ${userInfo.lastName} want create offer. Accept or reject it.`, 
    html: `Offer description: ${offerInfo.text}.<br/> Follow the <a>link</a> to accept or reject it`, 
  });

  console.log("Message sent: %s", info.messageId);
  return pass
}
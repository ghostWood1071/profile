var nodeMailer = require('nodemailer');
class MailSender{
    constructor(){
        this.mailHost = 'smtp.gmail.com'
        this.mailPort = 587
        this.transporter = nodeMailer.createTransport({
            host: this.mailHost,
            port: this.mailPort,
            secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
            auth: {
              user: 'profilecreator.pro@gmail.com',
              pass: 'kamenrider'
            }
          })
    }

    send(toMail, sub, content){
        var mail = {
            from: 'profilecreator.pro@gmail.com',
            to: toMail,
            subject: sub,
            html: content
        }
        return this.transporter.sendMail(mail);
        
    }

}

module.exports = MailSender;
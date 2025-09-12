const mailTransport = require("./mailTransoprt");

const sendOrder =  ({ to, html, number}) => {
    mailTransport.send({
      to,
      subject: `Ваш заказ на номер ${number} `,
      
  
      html:html,
  
    
    });
}

const sendVerif =  ({ to, num}) => {
    mailTransport.send({
      to,
      subject: `Код подтверждения `,
      
  
      text:num,
  
    
    });
}

module.exports={sendOrder,sendVerif}


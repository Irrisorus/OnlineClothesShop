// Актуализируем переменные окружения
require("dotenv").config();

const nodemailer = require("nodemailer");
const path = require("path");

//Достаём из переменных окружения логин и ПАРОЛЬ ПРИЛОЖЕНИЯ (не ваш пароль от почты)
const { GMAIL_PASS_KEY, GMAIL_USER } = process.env;

const gmailUser = GMAIL_USER;
const gmailPasskey = GMAIL_PASS_KEY;

// Для получения кода:
// -> google (профиль)
// -> security (безопаность)
// -> 2-Step Verification (2-этапная авторизация)
// -> App passwords (пароли приложений)

// Первые полторы минуты https://www.youtube.com/watch?v=74QQfPrk4vE
// Либо ещё https://www.getmailbird.com/gmail-app-password/
// https://support.google.com/mail/answer/185833?hl=en

const createTransporter = (gmailUser, gmailPasskey) => {
  const mailConfig = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailPasskey,
    },
    tls: { rejectUnauthorized: false },
  };
  return nodemailer.createTransport(mailConfig);
};

const transporter = createTransporter(gmailUser, gmailPasskey);

exports.send = ({ to, subject, text, html, absoluteAttacchmentPath }) => {
  transporter.sendMail(
    {
      from: `BRANDHOUSE <${gmailUser}@gmail.com>`,
      to,
      subject,

      text,

      html,

 
    },
    (error, info) => {
      if (error) {
        console.log("Error sending email: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

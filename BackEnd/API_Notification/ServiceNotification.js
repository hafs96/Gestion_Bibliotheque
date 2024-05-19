import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import amqp from "amqplib";
import nodemailer from "nodemailer";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3000;
const rabbitUrl = "amqp://localhost:5672";

app.listen(port, (err) => {
    if (err) {
      console.log("Erreur de notification en port ", port);
    } else {
      console.log("Le service de motification est lance au port ", port);
    }
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};

async function handleNewEmpruntAdded(emprunt) {
  const { clientEmail, livreTitle } = emprunt;
  const subject = 'New Emprunt Added';
  const text = `Dear Customer, you have successfully borrowed the book "${livreTitle}".`;
  await sendEmail(clientEmail, subject, text);
};

//un livre a été retourné
async function handleNewRetourAdded(retour) {
  const {livreTitle } = retour;
  const subject = 'un livre a été retourné';
  const text = `cher client, Le livre "${livreTitle}"a ete disponible.`;
  const users = await fetchAllUsers();
  users.forEach(async (user) => {
    await sendEmail(user.email, subject, text);
  });
}
//retourner la liste des email des clients






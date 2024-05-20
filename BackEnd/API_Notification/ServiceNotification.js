import amqp from "amqplib";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3000;

const rabbitUrl = "amqp://localhost:5672";

app.listen(port, (err) => {
  if (err) {
    console.log("Erreur de notification au port", port);
  } else {
    console.log("Le service notification est lance par le port", port);
  }
});

async function Messages() {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();
    const queue = "notification_queue";

    await channel.assertQueue(queue, { durable: true });
    console.log("En attente des messages...");

    channel.consume(queue, (msg) => {
      const message = JSON.parse(msg.content.toString());
      console.log("Message recu:", message);

      switch (message.eventType) {
        case "new_emprunt_added":
          handleNewEmpruntAdded(message.emprunt);
          break;
        case "emprunt_returned":
          handleEmpruntReturned(message.emprunt);
          break;
        case "new_livre_added":
          handleNewLivreAdded(message.livre);
        default:
          console.log("Unknown message type:", message.eventType);
      }

      channel.ack(msg);
    });
  } catch (error) {
    console.error(error);
  }
}
//handleNewLivreAdded
async function handleNewLivreAdded(livre) {
  const res = await axios.get("http://localhost:3000/api/v1/clients");
  const clientsList = await res.data.clients;
  if (clientsList) {
    for (let i = 0; i < clientsList.length; i++) {
      let email = clientsList[i].email;
      sendMail(email, "Nouveau Livre ajoute a notre bibliotheque", livre);
    }
  }
}
//handleNewEmpruntAdded
async function handleNewEmpruntAdded(emprunt) {
  const res = await axios.get("http://localhost:3000/api/v1/clients");
  const clientsList = await res.data.clients;
  if (clientsList) {
    for (let i = 0; i < clientsList.length; i++) {
      let email = clientsList[i].email;
      sendMail(email, "Nouveau Emprunt ajoute a notre bibliotheque", emprunt);
    }
  }
}
//handleEmpruntReturned
async function handleEmpruntReturned(emprunt) {
  const res = await axios.get("http://localhost:3000/api/v1/clients");
  const clientsList = await res.data.clients;
  if (clientsList) {
    for (let i = 0; i < clientsList.length; i++) {
      let email = clientsList[i].email;
      sendMail(email, "Emprunt retourne a notre bibliotheque", emprunt);
    }
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.my_host,
  port: 465,
  secure: true,
  auth: {
    user: process.env.my_username,
    pass: process.env.my_password,
  },
});

const sendMail = async (_to, subject, l) => {
  const text = `<h1>${subject}}</h1>
    <p>Livre Code: ${l.code}</p>
    <p>Livre Titre: ${l.titre}</p>
    <p>Livre Description: ${l.description}</p>
    <p>Livre Auteur: ${l.auteur}</p>
  `;
  try {
    let info = await transporter.sendMail({
      from: process.env.my_username,
      to: _to,
      subject: subject,
      html: text,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error };
  }
};

Messages();
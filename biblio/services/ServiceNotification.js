import amqp from "amqplib";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import amqp from 'amqplib';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { handleNewEmpruntAdded, handleEmpruntReturned, handleNewLivreAdded } from '../../backend/api-notifications/Controllers/NotificationControllers';


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port || 3003;
const rabbitUrl = process.env.RABBITMQ_URL|| "amqp://localhost:5672";
const mongoUrl = process.env.mongoUrl || "mongodb://localhost:27017/";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

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



Messages();
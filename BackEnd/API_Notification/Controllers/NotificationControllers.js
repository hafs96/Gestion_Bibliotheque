import nodemailer from 'nodemailer';
import Notification from '../models/NotificationModel.js';

//La creation d'un canal de transport de mail

const transporter = nodemailer.createTransport({
    host: process.env.my_host,
    port: 465,
    secure: true,
    auth: {
      user: process.env.my_username,
      pass: process.env.my_password,
    },
  });
  
//La fonction d'envoyer des mails

async function sendEmail(to, subject, text) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text
    };
  
    await transporter.sendEMail(mailOptions);
        // Enregistrer les notifications
        const notification = new Notification({
          eventType: subject,
          recipient: to,
          subject,
          message: text
        });
      
        await notification.save();
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


export { handleNewLivreAdded, handleNewEmpruntAdded, handleEmpruntReturned };
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import LivreRoute from "./routes/LivreRoute.js";

//
const app = express();
const PORT = process.env.PORT || 3000;cd

// Utilisation de body-parser pour traiter les requêtes JSON et URL-encoded
app.use(bodyParser.json());

// Utilisation des routes définies
app.use("/livre", LivreRoute);

//Connexion avec la base de donnees

mongoose.connect("mongodb://localhost:27017/dblivre", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("La connexion reussi");
    app.listen(PORT, () => {
      console.log(`Le serveur est lance dans le port ${PORT}`);
    });
  })
  .catch((err) => console.error("Erreur de connexion :", err));

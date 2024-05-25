import Emprunt from ("../controllers/EmpruntController.js");
import express from("express");

const routes = express.Router();

routes.post("/api/v1/emprunt", Emprunt.addEmprunt);
routes.post("/api/v1/emprunt/retour", Emprunt.returnLivre);
routes.get("/api/v1/emprunt/:idClient", Emprunt.getEmprunts);

export default routes;

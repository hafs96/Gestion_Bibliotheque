import express from "express"
import Client from "../controllers/ClientController.js"

const routes = express.Router();

routes.get("/api/v1/client/:idClient", Client.getClient);
routes.post("/api/v1/client", Client.addClient);
routes.put("/api/v1/client/:idClient", Client.updateClient);
routes.delete("/api/v1/client/:idClient", Client.deleteClient);

export default routes;

import Emprunt from ("../models/Emprunt.js");
import axios from ("axios");

exports.addEmprunt = async (req, res) => {
    try {
        const { code_livre, id_client } = req.body;

        const Livre = await axios.get(`http://api-livre:8081/api/v1/livre/${code_livre}`);
        const Client = await axios.get(`http://api-client:3000/api/v1/client/${id_client}`);

        if (Livre.status === 200 && Client.status === 200) {
            const emprunt = new Emprunt({ code_livre: code_livre, id_client: id_client });
            await emprunt.save();
            res.status(200).json(emprunt);
        } else {
            res.status(404).send("Livre ou client non trouvé");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.returnLivre = async (req, res) => {
    try {
        const { idEmprunt } = req.body;
        const emprunt = await Emprunt.findById(idEmprunt);
        if (emprunt) {
            emprunt.dateRetour = new Date();
            await emprunt.save();
            res.status(200).json(emprunt);
        } else {
            res.status(404).send("Emprunt non trouvé");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEmprunts = async (req, res) => {
    try {
        const emprunts = await Emprunt.find({ client: req.params.idClient });
        if (emprunts.length > 0)
            res.status(200).json(emprunts);
        else
            res.status(404).send("Emprunt non trouvé");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

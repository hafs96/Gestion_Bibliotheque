import Client from "../models/Client.js"

exports.getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.idClient);
        if (client)
            res.status(200).json(client);
        else
            res.status(404).send("Client non trouvé");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(200).json(client);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.idClient, req.body, { new: true });
        if (client)
            res.status(200).json(client);
        else
            res.status(404).send("Client non trouvé");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.idClient);
        if (client)
            res.status(200).send("Client supprimé");
        else
            res.status(404).send("Client non trouvé");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

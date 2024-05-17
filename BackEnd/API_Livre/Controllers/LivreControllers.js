const Livre = require("../models/livreModel");

exports.getLivreById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.idLivre);
    if (!livre) {
      return res.status(404).json({ message: "Livre not found" });
    }
    res.status(200).json(livre);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addLivre = async (req, res) => {
  try {
    const { code, titre, description, auteur } = req.body;
    const newLivre = new Livre({ code, titre, description, auteur });
    await newLivre.save();
    res.status(201).json(newLivre);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateLivre = async (req, res) => {
  try {
    const { code, titre, description, auteur } = req.body;
    const updatedLivre = await Livre.findByIdAndUpdate(
      req.params.idLivre,
      { code, titre, description, auteur },
      { new: true }
    );
    if (!updatedLivre) {
      return res.status(404).json({ message: "Livre not found" });
    }
    res.status(200).json(updatedLivre);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteLivre = async (req, res) => {
  try {
    const deletedLivre = await Livre.findByIdAndDelete(req.params.idLivre);
    if (!deletedLivre) {
      return res.status(404).json({ message: "Livre not found" });
    }
    res.status(200).json({ message: "Livre deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

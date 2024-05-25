import { Schema, model } from "mongoose";

const EmpruntSchema = new Schema(
    {
        code_livre: { type: mongoose.Schema.Types.ObjectId, ref: "Livre", required: true },
        id_client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
        dateEmprunt: { type: Date, default: Date.now },
        dateRetour: { type: Date, default: null }
    });

export default model("emprunt", EmpruntSchema);


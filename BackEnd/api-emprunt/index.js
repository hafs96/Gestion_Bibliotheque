import express from "express"
import mongoose from "mongoose"
import EmpruntRoute from "./routes/emprunt.js"

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/dbemprunt")
    .then(() => {
        console.log("Connecté à Mongo")
    })
    .catch(() => {
        console.log("Non connecté à Mongo")
    })

app.use(EmpruntRoute);

app.listen(3001, (err) => {
    if (err)
        console.log("Incapable de lancer le serveur sur 3001")
    else
        console.log("Server lancé sur 3001")
})
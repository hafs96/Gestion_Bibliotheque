import express from "express"
import mongoose from "mongoose"
import ClientRoute from "./routes/client.js"

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/dbclient")
    .then(() => {
        console.log("Connecté à Mongo")
    })
    .catch(() => {
        console.log("Non connecté à Mongo")
    })

app.use(ClientRoute);

app.listen(3000, (err) => {
    if (err)
        console.log("Incapable de lancer le serveur sur 3000")
    else
        console.log("Server lancé sur 3000")
})
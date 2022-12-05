import express from "express"
import cors from "cors"

import db from "./config/dbConnect.js"
import router from "./router.js"

db.on("error", console.log.bind(console, "Erro de conexão"))
db.once("open", () => {
    console.log("conexão com o banco feita com sucesso")
})
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)






export default app
import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@bank.6q7fzd5.mongodb.net/registry`)

let db = mongoose.connection;

export default db
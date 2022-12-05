import mongoose from "mongoose";


const Client = mongoose.model("clients", {   
    name: String,
    cpf: String,
    password: String,
    comeIn:    Number,
    out:  Number,
    total: Number,
})


export default Client
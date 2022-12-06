import  express  from "express";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import Client from "./models/Client.js"


dotenv.config()

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({msg: "welcome"})
})

router.post("/register", async(req, res) => {
    const {name, cpf, password, comeIn, out, total} = req.body

    if (!name) {
        return res.status(422).json({msg: "Nome é obrigatorio no cadastro"})
    }

    if (!cpf) {
        return res.status(422).json({msg: "CPF é obrigatorio no cadastro"})
    }

    if (cpf.length !== 11) {
        return res.status(422).json({msg: "CPF deve ter 11 caracteres"})
    }

    if (!password) {
        return res.status(422).json({msg: "A senha é obrigatorio no cadastro"})
    }

    const UserExists = await  Client.findOne({cpf: cpf})
    if(UserExists) return res.status(422).json({msg: "Usuario já cadastrado em nosso sistema"})

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const client = new Client ({
        name,
        cpf, 
        password: passwordHash,
        comeIn: 0,
        out: 0,
        total: 0,
    })

    try {
        await client.save()
        return res.status(500).json({msg: "cadastro realizado com sucesso, faça o login após confirmar cadastro."})

    } catch(error){
        return res.status(500).json({msg: "Erro no servidor"})
    }

})

router.post('/login', async(req, res) => {
    const {cpf, password} = req.body

    if (!cpf) {
        return res.status(422).json({msg: "CPF é necessario para realizar o login"})
         
    }

    if (cpf.length !== 11) {
        return res.status(422).json({msg: "CPF deve ter 11 caracteres"})
    }

    if (!password) {
        res.status(422).json({msg: "A senha é obrigatorio para realizar o login"})
        return 
    }

    const user = await Client.findOne({cpf: cpf})

    if(!user) return res.status(422).json({msg: "Usuario não foi cadastrado em nosso sistema"})
    const id = user.id
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) return res.status(404).json({msg: "senha invalida"})

    try {

        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user._id
            },
            secret,
        )
        return res.status(200).json({msg: "autenticação realizada com sucesso", id, token})

    } catch(error){
        return res.status(500).json({
            msg: "Erro no servidor"
        })
    }

})

router.get("/user/:id", checkToken, async(req, res) => {
    const id = req.params.id 
    const user = await Client.findById(id, '-password')

    if(!user) return res.status(404).json({msg: "usuario não foi encontrado"})

    return res.status(200).json({ user })

})

router.post('/deposit/:id', checkToken, async(req,res) => {
    if (!req.body.value) return res.status(204).json({ msg: 'Favor informar um valor para o deposito' })
    if (req.body.value > 2000) return res.status(422).json({ msg: 'Valor muito alto' })
    const id = req.params.id
    const user = await Client.findById(id, '-password')
    const saldo = Number(user.total)
    const valueAfterDeposit = saldo + req.body.value

  try {
    await user.updateOne({ total: valueAfterDeposit, comeIn: Number(user.comeIn) + req.body.value })
    return res.status(200).json({ msg: 'Depósito executado com sucesso.' })
  } catch (error) {
    return res.status(500).json({ msg: 'Erro interno'})
  }
})

router.post('/transfer/:id', checkToken, async(req,res) => {
    const {cpf, value} = req.body
    
    if (!value) return res.status(204).json({ msg: 'Favor informar um valor para a transferência' })

    if (!cpf) {
        return res.status(422).json({msg: "CPF da conta é necessario para a transferência"})
    }

    if (cpf.length !== 11) {
        return res.status(422).json({msg: "CPF deve ter 11 caracteres"})
    }
    
    const id = req.params.id 
    const user = await Client.findById(id, '-password')
    const receiver = await Client.findOne({cpf: cpf})

    if (!receiver) {
        return res.status(422).json({msg: "CPF não encontrado"})
    }
    const saldo = Number(user.total)

    if(saldo < value  ) return res.status(422).json({ msg: 'Saldo insuficiente' })
    const valueAfterTransfer = saldo - value

    const saldoReceiver = Number(receiver.total)
    const valueAfterTransferReceiver = saldoReceiver + value



  try {
    await user.updateOne({ total: valueAfterTransfer, out: user.out + value })
    await receiver.updateOne({ total: valueAfterTransferReceiver, comeIn: receiver.comeIn + value })
    
    return res.status(200).json({ msg: 'Transferência executada com sucesso.' })
  } catch (error) {
    return res.status(500).json({ msg: 'Erro interno'})
  }
})


function checkToken(req, res, next){
    const reqHeader = req.headers['authorization']
    const token = reqHeader && reqHeader.split(" ")[1]

    if(!token){
        return res.status(401).json( {msg: "Acesso negado"})
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch(error){
        return res.status(400).json({ msg: "Token inválido"})
    }
}


export default router
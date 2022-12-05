import React, {useState} from 'react'
import axios from 'axios'
import { Box } from './styles'
import { Container } from '../login/styles'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [userName, setUserName] = useState("")
    const [cpf, setCpf]= useState("")
    const [password, setPassword]= useState("")
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        const URL =  `${process.env.REACT_APP_BASE_URL}/register`
        const user = {
            name: userName,
            cpf: cpf,
            password: password
        }
        axios.post(URL, user)
            .then(response => {
                alert(response.data.msg)
                navigate("/")} 
                )
            .catch(error => {
                alert(error.response.data.msg)
                if(error.response.status === 500) navigate("/")
            })
        setUserName("")
        setCpf("")
        setPassword("")
    }


    return (
        <Container>
            <main>
                <Box>
                    <form onSubmit={handleSubmit}>
                        Nome: <input name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        CPF: <input name="cpf" type="text" value={cpf} onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}/>
                        Senha: <input name="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit">Registrar</button>
                    </form>
                </Box>
            </main>
        </Container>
    )
}

export default Register
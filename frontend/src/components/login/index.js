import React, {useState, useEffect, useContext} from 'react'
import { Container, Box } from './styles'
import { MdOutlineSettingsCell } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

function Login() {
    const [cpf, setCpf]= useState("")
    const [password, setPassword]= useState("")
    const { user, signIn, signed } = useContext(AuthContext);
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        const data = {
            cpf,
            password,
          };
          await signIn(data);
    }

    function showLoginPage(){
        return (
            <Container>
                <main>
                    <div>
                        O controle financeiro sempre nas suas mãos <MdOutlineSettingsCell />
                    </div>
    
                    <Box>
                        <form onSubmit={handleLogin}>
                            CPF <input name="cpf" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                            Senha <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit">Login</button>
                        </form>
                        <button className='text'><Link to ={'/register'}>ABRA SUA CONTA</Link></button>
                    </Box>
                </main>
            </Container>
        )
    }
    useEffect(() => {
        if (signed) {
          navigate(`/user/${user.id}`);
        }
    },[signed])

    if(!signed) return showLoginPage()
    
}
export default Login
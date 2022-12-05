import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container } from './styles'
import { AuthContext } from '../../context/authContext';

function User() {
  const [user, setUser] = useState({})
  const [cpf, setCpf] =  useState('')
  const [deposit, setDeposit] = useState(0)
  const [deposited, setDeposited] = useState(0)
  const [transfer, setTransfer] = useState(0)
  const [transferred, setTransferred] =  useState(0)
  const { singOut } = useContext(AuthContext)

  const {id} = useParams()
  const storageToken = localStorage.getItem("@Auth:token");
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${storageToken}`
    }
  })

  function fetchUser(){
    authAxios.get(`/user/${id}`)
      .then(response => {setUser({...response.data.user})})
      .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchUser()
  }, [])
  

  function handleDeposit(e){
    e.preventDefault()
    authAxios.post(`/deposit/${id}`,{value: parseFloat(deposit)})
    .then(response => {
      alert(response.data.msg)
      setDeposited(deposited + parseFloat(deposit))})
    .catch(error => alert(error.response.data.msg))

    setDeposit(0)
  }

  function handleTransfer(e){
    e.preventDefault()
    authAxios.post(`/transfer/${id}`,{value: parseFloat(transfer), cpf: cpf})
    .then(response => {
      alert(response.data.msg)
      setTransferred(transferred + parseFloat(transfer))
      setTransfer(0)
    })
    .catch(error => alert(error.response.data.msg))
    setCpf('')
  }

  

  
  return (

    <Container>
    <Box>
     Olá, { user.name }
     <div>
      Saldo em conta: { user.total + parseFloat(deposited)} R$
     </div>
    <div className='inOut'>
      <span>Entrada: { user.comeIn + parseFloat(deposited) } R$</span>

      <span>Saída: {user.out + parseFloat(transferred)} R$</span>
    </div>

      <div className='accountManage'>
        <form onSubmit={handleDeposit}>
          <label>
          Valor: <input type='number' 
          value = {deposit}
          onChange={(e) => setDeposit((e.target.value))}>
          </input>
          </label>
          <button type='submit'>Depositar</button> 
        </form>
      </div>

      <div className='accountManage'>
      <form onSubmit={handleTransfer}>
          <div className='transferInputs'>
            <label>
              CPF: <input type='text'
              value = {cpf}
              onChange={(e) => setCpf((e.target.value.replace(/\D/g, '')))}>
              </input>
            </label>

            <label>
              Valor: <input type='number' 
              placeholder='valor'
              value = {transfer}
              onChange={(e) => setTransfer((e.target.value))}>
              </input>
            </label>
          </div>
          <button type='submit'>Transferir</button> 
        </form>
      </div>

      <button onClick={singOut}>Sair</button>

     </Box>
     </Container>
  )
}

export default User
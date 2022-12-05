import React from 'react'
import {Container} from './styles.js'
import {CiBank} from "react-icons/ci"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <Container>
        <div className='app'>
          <div className='logoBank'>
            <CiBank className='imageBank'/> <span>Digital Bank</span>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
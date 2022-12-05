import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"

import Navbar from "../navbar";
import Login from "../login";
import Register from "../register";
import User from "../user";
import { PrivateRoute } from "../../routes/privateRoutes";

import { AuthProvider } from "../../context/authContext";

function App() {
  return (
    <AuthProvider>
    <Container>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<PrivateRoute />}>
          <Route path="/user/:id" element= {<User />}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </Container>
    </AuthProvider>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
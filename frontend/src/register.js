import React, { useState } from 'react';
import Card from "./components/Card.js";
import './styles/register.css';


function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (event) => {
        event.preventDefault();
      }

    return (
        <Card width="300px" height="400px">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <label>Email</label>
          <input value={email} onChange={(event) => setEmail(event.target.value)} required />
  
          <label>Display Name</label>
          <input value={name} onChange={(event) => setName(event.target.value)} required />
  
          <label>Password</label>
          <input value={password} onChange={(event) => setPassword(event.target.value)} required />
  
          <label>Confirm Password</label>
          <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
  
          <button type="submit">Register</button>
        </form>
      </Card>
    );
  }

export default Register;

import React, { useState } from "react";
import Card from "./components/Card.js";
import './styles/Register.css';
import { redirect, useNavigate } from "react-router-dom";


function Register() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const handleRegister = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/register`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.status === 200) {
                navigate("/settings", { replace: true })
            } else {
                setUserName("")
                setPassword("")
            }
        })
    }

    return (
        <div className="Register">
            <Card width="500px">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                <label>Username</label>
                <input type="text" value={username} onChange={(event) => setUserName(event.target.value)} required />

                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />

                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />

                <button type="submit" onClick={handleRegister}>Submit</button>
            
            </form>
        </Card>
    </div>
  );
}

export default Register;

import React, { useState } from "react";
import Card from "./components/Card.js";
import './styles/Register.css';
import { Link, redirect, useNavigate } from "react-router-dom";


function Register() {
    const [username, setUsername] = useState("");
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
                if (localStorage.getItem("username") != username) {
                    setUsername(username)
                    localStorage.setItem("username", username)
                }
                navigate("/settings", { replace: true })
            } else {
                setUsername("")
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
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />

                    <label>Password</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />

                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />

                    <div className="register-account">
                        <button type="submit" onClick={handleRegister} style={{ marginBottom: "30px" }}>Submit</button>
                        <label>Already have an account? </label>
                        <Link to="/login">Log In</Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}

export default Register;

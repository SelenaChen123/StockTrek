import { useState } from "react";
import Card from "./components/Card.js";
import "./styles/Login.css";
import { Link, redirect } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/login?username=${username}&password=${password}`).then(res => res.json()).then(data => {
      if (data.data === true) {
        redirect("/")
      } else {
        setUsername("")
        setPassword("")
      }
    })
  };

  return (
    <div className="Login">
      <Card width="500px">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <div className="register-account">
            <button type="submit" onClick={handleLogin}>Login</button>
            <label>Don't have an account? </label>
            <Link to="/register">Sign Up</Link>
          </div>
        </form >
      </Card >
    </div >
  );
}

export default Login;

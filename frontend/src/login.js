    import { useState } from "react";
    import Card from "./components/Card.js";
    import "./styles/login.css";
    import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);


    const handleLogin = (event) => {
        event.preventDefault();
        console.log("login successfully");
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        setShowForgotPassword(true);
    }

    return (
        <div className="login">
            <Card width="300px">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                />

                <label>Password</label>
                <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                />

                <div className="forget-password">
                    <a href="#" onClick={handleForgotPassword}>Forget Password?</a>
                </div>

                <div className="register-account">
                    <button type="submit">Login</button>
                    <label>Don't have an account? </label>
                    <Link to="/register">Sign Up</Link>
                </div>
                </form>
            </Card>
        </div>
    );
    }

    export default Login;

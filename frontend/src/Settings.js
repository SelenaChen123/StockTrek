import Navbar from "./components/Navbar";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './components/Avatars';
import { useState } from "react";
import './styles/Settings.css'
import { redirect, useNavigate } from "react-router-dom";

function Settings() {
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    function handleResetBalance() {
        setBalance(0);
    }

    function handleSetBalance(event) {
        event.preventDefault();
        const amount = Number(event.target.elements.balance.value);
        const username = localStorage.getItem("username")
        fetch(`http://localhost:8080/reset?username=${username}&initMoney=${amount}`, { method: "POST" }).then(res => {
            if (res.status === 200) {
                navigate("/", { replace: true })
            }
        })
        setBalance(amount);
    }

    return (
        <>
            <Navbar />
            <div className="Settings">
                <div className="Settings-avatar">
                    <Avatar style={{ width: "400px", height: "400px" }} avatarStyle="Circle" {...generateRandomAvatarOptions()} />
                </div>
                {balance === 0 && (
                    <div className="Settings-initial-balance">
                        <p style={{ fontSize: "1rem" }}>Set your virtual balance and begin a new simulation:</p>
                        <form onSubmit={handleSetBalance}>
                            <div className="Settings-input-group">
                                <input type="number" name="balance" />
                                <button type="submit">Set</button>
                            </div>
                        </form>
                    </div>
                )}
                {balance !== 0 && (
                    <form onSubmit={handleSetBalance}>
                        <div className="Settings-set-balance">
                            <button onClick={handleResetBalance}>Reset Simulation</button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export default Settings;


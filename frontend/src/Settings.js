import Navbar from "./components/Navbar";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './components/Avatars';
import { useState } from "react";
import './styles/Settings.css'

function Settings() {
    const [balance, setBalance] = useState(0);

    function handleResetBalance() {
        setBalance(0);
    }

    function handleSetBalance(event) {
        event.preventDefault();
        const amount = Number(event.target.elements.balance.value);
        setBalance(amount);
    }

    return (
        <>
            <Navbar />
            <div className="Settings">
                <div className="Settings-avatar">
                    <Avatar style={{ width: "400px", height: "400px" }} avatarStyle="Circle" {...generateRandomAvatarOptions()} />
                </div>
                <h3>Your current account balance is ${balance}</h3>
                {balance === 0 && (
                    <div className="Settings-initial-balance">
                        <p>New to the game? Set an initial balance:</p>
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


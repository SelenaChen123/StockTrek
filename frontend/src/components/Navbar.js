import "../styles/Navbar.css";
import Logo from "../images/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './Avatars';

const Navbar = () => {

    return (
        <div className="Navbar">
            <div className="nav-items">
                <Link to="/">
                    <img src={Logo} alt="Logo" />
                </Link>
                <Link to="/">Home</Link>
                <Link to="/stocks">Stocks</Link>
                <Link to="/news">News</Link>
                    {/* <FaUserCircle size="2em"/> */}
                    {/* <Avatar style={{ width: '50px', height: '50px' }} avatarStyle="Circle" /> */}
                <div className="dropdown">
                    <div className="avatar">
                        {/* <Avatar style={{ width: '50px', height: '50px' }} avatarStyle="Circle" {...generateRandomAvatarOptions() }/> */}
                        <FaUserCircle size="2em"/>
                    </div>
                    <div className="dropdown-content">
                        <Link to="/settings">Settings</Link>
                        <Link to="/login">Logout</Link>
                    </div>
                </div>
            </div>
         </div>

    );
}

export default Navbar;
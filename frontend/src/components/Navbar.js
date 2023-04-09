import '../styles/Navbar.css';
import Logo from '../images/logo.svg';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Navbar= () => {

    return (
            <div className="Navbar">
                <div className="nav-items">
                <Link to="/">
                    <img src={Logo} alt="Logo" />
                </Link>
                <Link to="/">Home</Link>
                <Link to="/stocks">Stocks</Link>
                <Link to="/news">News</Link>
                <Link to="/profile">
                    <FaUserCircle size="2em"/>
                </Link>
                </div>
            </div>
    );
  }

export default Navbar;
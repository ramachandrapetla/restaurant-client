import { useState, useEffect } from 'react';
import { isUserLoggedIn, logoutUser } from '../../utility/user-data-util';
import { Link, useHistory } from 'react-router-dom';
import './navbar.css';
import Auth from '../../Auth';

const NavBar = ({isAuthenticated, setIsAuthenticated}) => {
    const history = useHistory();
    const {logout} = Auth();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setIsAuthenticated(false);
        history.push("/");
        
    }

    return (
        <nav className="navbar">
            <h1><b>LikeIT</b></h1>
            <ul className="nav-links">
                <li className="nav-item"><a href="/">Menu</a></li>
                {isAuthenticated ?
                    <>
                    <li className="nav-item"><a href="/profile">Profile</a></li>
                    <li className="nav-item"><a href="/bookings">Bookings</a></li>
                    <li className="nav-item"><a href="/orders">Orders</a></li>
                    </> : <></>
                }
                {
                    isAuthenticated ? 
                    <>
                        <li className="nav-item"><a href="/cart">cart</a></li>
                        <li className="nav-item"><a href="#" onClick={handleLogout} >logout</a></li>
                    </>: <></>
                }
            </ul>
        </nav>

    )
}

export default NavBar;
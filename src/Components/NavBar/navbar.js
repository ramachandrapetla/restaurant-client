import { useState, useEffect } from 'react';
import { isUserLoggedIn, logoutUser } from '../../utility/user-data-util';
import { useHistory } from 'react-router-dom';
import './navbar.css';

const NavBar = ({isLogedIn, setLoginUser}) => {
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser();
        setLoginUser(false);
        
    }

    return (
        <nav className="navbar">
            <h1>Bale Bojanam</h1>
            <ul className="nav-links">
                <li className="nav-item"><a href="#">Menu</a></li>
                {isUserLoggedIn() ?
                    <>
                    <li className="nav-item"><a href="#">Profile</a></li>
                    <li className="nav-item"><a href="#">Bookings</a></li>
                    <li className="nav-item"><a href="#">Orders</a></li>
                    </> : <></>
                }
                {
                    isUserLoggedIn() ? <li className="nav-item"><a href="#" onClick={handleLogout} >logout</a></li>
                    : <li className="nav-item"><a href="/login" >login</a></li>
                }
            </ul>
        </nav>
    )
}

export default NavBar;
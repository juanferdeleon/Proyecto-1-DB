import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Nav = () => {
    return(
        <nav>
            <Link to="/admin-home"><h2>Proyecto 1 DB</h2></Link>
            <ul className="nav-links">
                <Link to="/admin-home/mods"><li>Modificaciones</li></Link>
                <Link to="/admin-home/stats"><li>Estadisticas</li></Link>
                <Link><li>Logout</li></Link>
            </ul>
        </nav>
    )
}

export default Nav;
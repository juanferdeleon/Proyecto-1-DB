import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/auth';
import * as selectors from '../../../reducers/index';
import './styles.css';

const Nav = ({ onClick }) => {
    return(
        <nav>
            <Link to="/admin-home"><h2>Proyecto 1 DB</h2></Link>
            <ul className="nav-links">
                <Link to="/admin-home/mods"><li>Modificaciones</li></Link>
                <Link to="/admin-home/stats"><li>Estadisticas</li></Link>
                <Link onClick={onClick}><li>Logout</li></Link>
            </ul>
        </nav>
    )
}

export default connect(
    undefined,
    dispatch => ({
        onClick(){
            dispatch(actions.logout())
        }
    })
)(Nav);
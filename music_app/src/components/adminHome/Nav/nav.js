import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/auth';
import * as selectors from '../../../reducers/index';
import './styles.css';

const Nav = ({ onClick, isLoggedIn, isAdminUser }) => {
    return(
        <nav>
            { !isLoggedIn ? <h2>Proyecto 1 DB</h2> : null }
            { isLoggedIn && isAdminUser ? <Link to="/admin-home"><h2>Proyecto 1 DB</h2></Link> : null }
            { isLoggedIn && !isAdminUser ? <Link to="/user-home"><h2>Proyecto 1 DB</h2></Link> : null }            
            <ul className="nav-links">
                { isLoggedIn && isAdminUser ? <Link to="/admin-home/mods"><li>Modificaciones</li></Link> : null }
                { isLoggedIn && isAdminUser ? <Link to="/admin-home/stats"><li>Estadisticas</li></Link> : null }
                { isLoggedIn ? <Link to='/' onClick={onClick}><li>Logout</li></Link>: null }
            </ul>
        </nav>
    )
}

export default connect(
    state => ({
        isLoggedIn: selectors.getIsAuth(state),
        isAdminUser: selectors.getIsAdminUser(state),
    }),
    dispatch => ({
        onClick(){
            dispatch(actions.logout())
        }
    })
)(Nav);
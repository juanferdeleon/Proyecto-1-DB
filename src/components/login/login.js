import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import * as actions from '../../actions/auth'

const Login = ({ onClick }) => {

    const [firstName, changefirstName] = useState('');
    const [lastName, changelastName] = useState('');
    const [email, changeemail] = useState('');
    const [password, changepassword] = useState('');

    return (
    <div className = "wrapper">
        <div className = "form-wrapper">
            <h1>Create Account</h1>
            <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input type="text" placeholder="First Name" value={firstName} onChange={e => changefirstName(e.target.value)}/>
                {firstName.length < 3 && (
                <span className="errorMessage">{'*Minimum 3 characters required'}</span>
              )}
            </div>
            <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" placeholder="Last Name" value={lastName} onChange={e => changelastName(e.target.value)}/>
                {lastName.length < 3 && (
                <span className="errorMessage">{'*Minimum 3 characters required'}</span>
              )}
            </div>
            <div className="email">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="email" value={email} onChange={e => changeemail(e.target.value)}/>
            </div>
            <div className="password">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" value={password} onChange={e => changepassword(e.target.value)}/>
            </div>
            <div className="createAccount">
                <button type="submit" onClick={() => onClick({firstName, lastName, email, password})}>Create Account</button>
                <small>Already have an account?</small>
            </div>
        </div>
    </div>
    )
};

export default connect(
    undefined,
    dispatch => ({
        onClick(formInfo){
            dispatch(actions.loadUser(formInfo.email, formInfo.password))
        }
    })
)(Login);
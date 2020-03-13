import React, { useState } from 'react';
//import { connect } from 'react-redux';
import { reduxForm, Field, isSubmitting } from 'redux-form';
import './styles.css';

import * as actions from '../../actions/auth'

const Register = ({ handleSubmit, submitting }) => {
    return (
    <div className = "wrapper">
        <div className = "form-wrapper">
            <h1>Crea tu cuenta</h1>
            <form onSubmit={handleSubmit}>
                <div className="firstName">
                    <label>Nombre</label>
                    <Field name="firstName" label="Nombre" component="input"/>
                </div>
                <div className="lastName">
                    <label>Apellido</label>
                    <Field name="lastName" label="Apellido" component="input"/>
                </div>
                <div className="email">
                    <label>Correo Electronico</label>
                    <Field name="emailAddress" type="email" label="Correo Electronico" component="input"/>
                </div>
                <div className="password">
                    <label>Contraseña</label>
                    <Field name="password" type="password" label="Contraseña"component="input"/>
                </div>
                <div className="createAccount">
                    <button type="submit" disabled={submitting}>Crear Cuenta</button>
                    <small>¿Ya tienes una cuenta?</small>
                </div>
            </form>
        </div>
    </div>
    )
};

const createUser = async (values) => {
}

const validate = values => {
    const error = {}

    if(!values.firstName){
        error.firstName = 'Campo requerido'
    }
    if(!values.lastName){
        error.lastName = 'Campo requerido'
    }
    if(!values.emailAddress){
        error.emailAddress = 'Campo requerido'
    }
    if(!values.password){
        error.password = 'Campo requerido'
    }

    return error
}

// export default connect(
//     undefined,
//     dispatch => ({
//         onClick(formInfo){
//         }
//     })
// )(Register);

const renderInput = ({ input, meta }) =>
    <div>
        <pre>
            {JSON.stringify(meta, 0, 2)}
            {console.log(JSON.stringify(meta, 0, 2))}            
        </pre>
        <input {...input}/>
        {meta.error && (<span className="errorMessage">{'*Minimum 3 characters required'}</span>)}
    </div>

export default reduxForm({
    form: 'registerForm',
    onSubmit(values, dispatch){
        // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await sleep(500) // simulate server latency
        //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)

        console.log('Llega a submit');
        dispatch(actions.loadUser());

        const body = JSON.stringify({ usuario: values.emailAddress, password: values.password });

        console.log(body);

        const options = {
            hostname: 'localhost',
            port: 4000,
            path: '/users',
            method: 'POST',
            headers: {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'application/json',
            },
        }

        // const response = fetch('http://localhost:4000/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: body,
        // });

        const http = require('http');

        const response = http.request(options, res => {
            let data = '';
            res.on('data', chunk =>{
                data += chunk;
            });
            res.on('end', () => {
                let request = JSON.parse(data);
                console.log('REQUEST')
                console.log(request);
                // dispatch(actions.registerUser(request.action));
            })
        });

        response.write(body);

        console.log('RESPONSE')
        console.log(response);
    },
    validate
})(Register)
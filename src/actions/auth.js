import * as types from '../types/auth';
import  pool from '../postgresql/index';

// const express = require('express');
// let app = express();
// app.set('port', process.env.PORT || 4000);

export const loadUser = () => ({
    type: types.USER_LOADING
})

export const validateCredentials = async (user, password) => {
    //app.get("/pool", async (req, res) => {
        //return all rows
        pool.query('select * from usuario where usuario.usuario = $1', [user])
            .then(results => {

                console.log(results.rows[0].password)   
            
                //Desencriptar password de db
                if (results.rows[0].password === password){//Verifica si el password ingresado es correcto
                    return {
                        type: types.USER_LOADED,
                        payload: results.rows[0].usuario
                    }
                }else{
                    return{
                        type: types.AUTH_ERROR
                    }
                }
            })
            .catch(error => ({type: types.AUTH_ERROR}))
            .finally(() => pool.end());
    //})
        
    //app.listen(9000, () => console.log("Listening on port 9000"))
}

export const registerUser = (userInfo) => {

    //app.get('/registerUser', async (req, res) => {
        pool.query('select * from usuario where usuario.usuario = $1', [userInfo.email])
        .then(() => ({ type: types.REGISTER_FAIL }))
        .catch(() => {
            pool.query('INSERT INTO usuario VALUES($1, $2, $3, $4)', [userInfo.email, userInfo.password])
                .then(() => ({ type: types.REGISTER_SUCCES, payload: userInfo.email }))
                .catch(() => ({ type: types.REGISTER_FAIL }))
        })
        .finally(() => pool.end());
    //})
     
    //app.listen(4000, () => console.log("Listening on port 4000"))
}
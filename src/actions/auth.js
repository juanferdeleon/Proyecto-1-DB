import * as types from '../types/auth';
import pool from '../postgresql/index';

export const loadUser = () => ({
    type: types.USER_LOADING
})

export const validateCredentials = (user, password) => {
    
    pool.query('select * from usuario where usuario.usuario = $1', [user])
        .then(results => {

            console.log(results.rows[0].password)   
           
            //Desencriptar password de db
            if (results.rows[0].password == password){//Verifica si el password ingresado es correcto
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

}
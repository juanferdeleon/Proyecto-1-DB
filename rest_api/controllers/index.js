/*

            Consultas de Postgres

    Aqui se escribiran todas las consultas a PostgreSQL

*/

//Todas las variables de entorno se pueden acceder con proces.env.LAVARIABLE
require('dotenv').config();

const Cryptr = require('cryptr');
cryptr = new Cryptr(process.env.CRYPTRKEY);

const { Pool } = require('pg');

//Configuracion de PostgreSQL en caso no usen archivo .env
// const config = {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'postgres',
//     database: 'testdb'
// };

const pool = new Pool();

const getUsers = async (req, res) => {//Esto es para pruebas con el api y ver lo que devuelve
    const response = await pool.query('SELECT * FROM customer ORDER BY email ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {//Accede a la DB y verifica si existe el usuario

    const { emailAddress, password } = req.params;
    
    //await pool.query('SELECT * FROM usuario where usuario.usuario = $1', ['admin'])
    await pool.query('SELECT * FROM customer WHERE customer.email = $1', [emailAddress])
        .then(response => {//Recibimos la informacion de PostgreSQL

            if(response.rows.length == 0){//Verificamos si existe el usuario
                res.json({
                    action: { type: 'LOGIN_FAIL', payload: { msg: 'User does not exists' } }
                })
            } else {//Si existe

                if(cryptr.decrypt(response.rows[0].password) == cryptr.decrypt(password)){//Verificamos la contraseña
                    res.json({
                        action: { type: 'REGISTER_SUCCES', payload: { user: emailAddress } }
                    })
                } else {//Si la contraseña no es valida
                    res.json({
                        action: { type: 'AUTH_ERROR', payload: { msg: 'Wrong password' } }
                    })
                }
            }
        })
        .catch(() => {//En caso hay algun inconveniente con PostgreSQL

            res.json({
                action: { type: 'LOGIN_FAIL', payload: { msg: 'Server Issues' } }
            })

        });
};

const createUser = async (req, res) => {//Accede a la DB y crea el usuario

    //Informacion recibida
    const { emailAddress, password, firstname, lastname } = req.body;

    //Verificamos si el usuario ya existe
    await  pool.query('SELECT * FROM customer WHERE customer.email = $1', [emailAddress])
        .then(response => {//Se recibe informacion de PostgreSQL
            
            //En caso no existe
            if(response.rows.length == 0){
                pool.query('INSERT INTO customer(email, password, firstname, lastname) VALUES($1, $2, $3, $4)', [emailAddress, password, firstname, lastname])//Insertamos a la base de datos
                    .then(() => {

                        res.json({
                            action: { type: 'REGISTER_SUCCES', payload: { user: emailAddress, msg: 'User Added successfully'} }
                        })

                    })
                    .catch(() => {//En caso hay algun inconveniente con PostgreSQL

                        res.json({
                            action: { type: 'REGISTER_FAIL', payload: { msg: 'Server Issues. Try again later.' } }
                        })

                    })
            } else {//En caso el usuario ya existe

                res.json({
                    action: { type: 'REGISTER_FAIL', payload: { msg: 'User already exists' }}
                })

            }

        })
        .catch(() => {//En caso hay algun inconveniente con PostgreSQL

            res.json({
                action: { type: 'REGISTER_FAIL', payload: { msg: 'Server Issues. Try again later.' } }
            })

        })

};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
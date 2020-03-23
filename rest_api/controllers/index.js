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
    
    await pool.query('SELECT * FROM customer WHERE customer.email = $1', [emailAddress])
        .then(response => {//Recibimos la informacion de PostgreSQL

            if(response.rows.length == 0){//Verificamos si existe el usuario en CUSTOMER
                
                pool.query('SELECT * FROM employee WHERE employee.email = $1', [emailAddress])
                    .then(response2 => {

                        if(response2.rows.length == 0){//Verificamos si existe el usuario en EMPLOYEE
                            res.json({
                                action: { type: 'LOGIN_FAIL', payload: { msg: 'User does not exists' } }
                            })
                        } else {

                            if(cryptr.decrypt(response2.rows[0].password) == cryptr.decrypt(password)){//Verificamos la contraseña
                                res.json({
                                    action: { type: 'REGISTER_SUCCES', payload: { user: emailAddress, isAdminUser: true } }
                                })
                            } else {//Si la contraseña no es valida
                                res.json({
                                    action: { type: 'AUTH_ERROR', payload: { msg: 'Wrong password' } }
                                })
                            }

                        }

                    }).catch(() => {//En caso hay algun inconveniente con PostgreSQL

                        res.json({
                            action: { type: 'LOGIN_FAIL', payload: { msg: 'Server Issues' } }
                        })
            
                    });
                
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

    const { emailAddress } = req.params;

    const { plan, ccnumber, cvv } = req.body;

    await pool.query('UPDATE customer SET plan = $1, ccnumber = $2, cvv = $3 WHERE email = $4', [plan, ccnumber, cvv, emailAddress])
        .then(() => {
            res.json({
                action: { type: 'REGISTER_SUCCES', payload: { msg: 'Credit Card Added successfully' } }
            })
        })
        .catch(() => {
            res.json({
                action: { type: 'REGISTER_FAIL', payload: { msg: 'Server Issues. Try again later.' } }
            }) 
        });

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
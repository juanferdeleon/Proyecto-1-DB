/*

            Consultas de Postgres

    Aqui se escribiran todas las consultas a PostgreSQL

*/

//Todas las variables de entorno se pueden acceder con proces.env.LAVARIABLE
require('dotenv').config();

const { Pool } = require('pg');

//Configuracion de PostgreSQL en caso no usen archivo .env
// const config = {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'postgres',
//     database: 'testdb'
// };

const pool = new Pool();

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuario ORDER BY usuario ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {//Accede a la DB y verifica si existe el usuario

    const { emailAddress, password } = req.params;
    
    //await pool.query('SELECT * FROM usuario where usuario.usuario = $1', ['admin'])
    await pool.query('SELECT * FROM usuario WHERE usuario.usuario = $1', [emailAddress])
        .then(response => {//Recibimos la informacion de PostgreSQL

            if(response.rows.length == 0){//Verificamos si existe el usuario
                res.json({
                    message: 'User does not exists',
                    action: { type: 'LOGIN_FAIL' }
                })
            } else {//Si existe

                if(response.rows[0].password == password){//Verificamos la contraseña
                    res.json({
                        action: { type: 'REGISTER_SUCCES', payload: { user: emailAddress } }
                    })
                } else {//Si la contraseña no es valida
                    res.json({
                        message: 'Credenciales Invalidas',
                        action: { type: 'AUTH_ERROR' }
                    })
                }
            }
        })
        .catch(() => {//En caso hay algun inconveniente con PostgreSQL

            res.json({
                action: { type: 'LOGIN_FAIL' }
            })

        });
};

const createUser = async (req, res) => {//Accede a la DB y crea el usuario

    //Informacion recibida
    const { emailAddress, password } = req.body;

    //Verificamos si el usuario ya existe
    await  pool.query('SELECT * FROM usuario WHERE usuario.usuario = $1', [emailAddress])
        .then(response => {//Se recibe informacion de PostgreSQL
            
            //En caso no existe
            if(response.rows.length == 0){
                pool.query('INSERT INTO usuario VALUES($1, $2)', [emailAddress, password])//Insertamos a la base de datos
                    .then(() => {

                        res.json({
                            message: 'User Added successfully',
                            action: { type: 'REGISTER_SUCCES', payload: { user: emailAddress } }
                        })

                    })
                    .catch(() => {//En caso hay algun inconveniente con PostgreSQL

                        res.json({
                            action: { type: 'REGISTER_FAIL' }
                        })

                    })
            } else {//En caso el usuario ya existe

                res.json({
                    message: 'User already exists',
                    action: { type: 'REGISTER_FAIL' }
                })

            }

        })
        .catch(() => {//En caso hay algun inconveniente con PostgreSQL

            res.json({
                action: { type: 'REGISTER_FAIL' }
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
/*

        Consultas de Postgres

*/

//Todas las variables de entorno se pueden acceder con proces.env.LAVARIABLE

require('dotenv').config();

const { Pool } = require('pg');

// const config = {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'postgres',
//     database: 'testdb'
// };

const pool = new Pool();

const getUsers = async (req, res) => {
    //console.log(req);
    const response = await pool.query('SELECT * FROM usuario ORDER BY usuario ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM usuario WHERE usuario.usuario = $1', [id]);
    res.json(response);
    console.log(response);
};

const createUser = async (req, res) => {

    //Informacion recibida
    const { emailAddress, password } = req.body;

    //Verificamos si el usuario ya existe
    await  pool.query('SELECT * FROM usuario WHERE usuario.usuario = $1', [emailAddress])
        .then(response => {//Se recibe informacion de PostgreSQL
            
            //En caso no existe
            if(response.rows){
                pool.query('INSERT INTO usuario VALUES($1, $2)', [usuario, password])//Insertamos a la base de datos
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
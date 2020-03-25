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

const getAlbums = async (req, res) => {//GET ALBUMS
    const response = await pool.query('SELECT albumid as id, title as name FROM album ORDER BY name ASC');
    res.json({action: { type: 'ALBUMS_LOADED', payload: response.rows}});
};

const getTracks = async (req, res) => {//GET TRACKS
    const response = await pool.query('SELECT trackid as id, name FROM track ORDER BY name ASC');
    res.json({action: { type: 'TRACKS_LOADED', payload: response.rows}});
};

const getArtists = async (req, res) => {//GET ARTISTS
    const response = await pool.query('SELECT artistid as id, name FROM artist ORDER BY name ASC');
    res.json({action: { type: 'ARTISTS_LOADED', payload: response.rows}});
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

const getStats = async (req, res) => {//Hace consultas de estadisticas

    const graph1 = await pool.query('SELECT artist1.name, count(artist1.name) from album album1 join artist artist1 on album1.artistid = artist1.artistid group by artist1.name order by count(artist1.name) desc LIMIT 5;');
    const graph2 = await pool.query('SELECT COUNT(genre.genreid), genre.name FROM genre INNER JOIN track ON genre.genreid = track.genreid GROUP BY genre.genreid ORDER BY COUNT(genre.genreid) DESC LIMIT 5');
    const graph3 = await pool.query('SELECT playlist.playlistid, playlist.name, SUM(track.milliseconds/1000) AS Count FROM playlist LEFT JOIN playlisttrack ON playlisttrack.playlistid = playlist.playlistid LEFT JOIN track ON track.trackid = playlisttrack.trackid WHERE track.milliseconds IS NOT NULL GROUP BY playlist.playlistid ORDER BY Count DESC;');
    const graph4 = await pool.query('SELECT artist1.name, track1.name, (track1.milliseconds/1000) As Count FROM album album1 join artist artist1 on album1.artistid = artist1.artistid join track track1 on track1.albumid = album1.albumid  WHERE track1.mediatypeid = 2 OR track1.mediatypeid = 1 OR track1.mediatypeid = 4 OR track1.mediatypeid = 5 ORDER BY (track1.milliseconds) DESC LIMIT 5;');
    //const graph5 = await pool.query('');
    const graph6 = await pool.query('SELECT genre.name, SUM(track.milliseconds)/COUNT(*) as count FROM track INNER JOIN genre ON track.genreid = genre.genreid GROUP BY genre.genreid;');
    const graph7 = await pool.query('SELECT playlist1.name, COUNT(artist1.artistid) FROM playlist playlist1 JOIN playlisttrack playlisttrack1 ON playlist1.playlistid = playlisttrack1.playlistid JOIN track track1 ON track1.trackid = playlisttrack1.trackid JOIN album album1 ON album1.albumid = track1.albumid JOIN artist artist1 ON artist1.artistid = album1.artistid GROUP BY playlist1.name ORDER BY COUNT(artist1.name) DESC;');
    const graph8 = await pool.query('SELECT artist1.name, count(DISTINCT track1.genreid) as count from genre genre1 join track track1 on genre1.genreid = track1.genreid join album album1 on album1.albumid = track1.albumid join artist artist1 on artist1.artistid = album1.artistid group by artist1.name order by count(genre1.genreid) desc LIMIT 5;');
    res.json({ action: {type: 'STATS_LOADED', payload: { graph1:graph1.rows, graph2: graph2.rows, graph3: graph3.rows, graph4: graph4.rows, graph6: graph6.rows, graph7: graph7.rows, graph8: graph8.rows }} })
    res.status(200);
    
};

const newArtist = async (req, res) => {

    const { artistname, artistid } = req.body;

    await pool.query('SELECT * FROM artist WHERE name=$1', [artistname])
        .then(response => {//Se recibe informacion de PostgreSQL

            //En caso no existe
            if(response.rows.length == 0){

                pool.query('INSERT INTO artist VALUES($1, $2)', [artistid, artistname])//Insertamos a la base de datos
                    .then(() => {

                        res.json({
                            action: { type: 'REQUEST_SUCCESS', payload: { msg: 'Artist Added successfully'} }
                        })

                    })
                    .catch(() => {//En caso hay algun inconveniente con PostgreSQL
                        
                        res.json({
                            action: { type: 'REQUEST_FAIL', payload: { msg: 'Server Issues. Try again later.' } }
                        })

                    })
            } else {//En caso el artista ya existe

                res.json({
                    action: { type: 'REQUEST_FAIL', payload: { msg: 'Artist already exists' }}
                })

            }

        })
        .catch(() => {

            res.json({
                action: { type: 'REQUEST_FAIL', payload: { msg: 'Server Issues. Try again later.' } }
            }) 

        });

}

const newAlbum = async (req, res) => {

    const { albumname, albumid, artistid } = req.body;

    await pool.query('INSERT INTO album VALUES($1, $2, $3)', [albumid, albumname, artistid])//Insertamos a la base de datos
        .then(() => {

            res.json({
                action: { type: 'REQUEST_SUCCESS', payload: { msg: 'Album Added successfully'} }
            })

        })
        .catch(e => {//En caso hay algun inconveniente con PostgreSQL
            console.log(e)
            res.json({
                action: { type: 'REQUEST_FAIL', payload: { msg: 'Server Issues. Try again later.' } }
            })

        });

}

module.exports = {
    getUsers,
    getAlbums,
    getArtists,
    getTracks,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getStats,
    newArtist,
    newAlbum,
};
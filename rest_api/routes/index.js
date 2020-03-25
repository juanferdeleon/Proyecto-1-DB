/*
            Routers

    Rutas para acceder al API

    Estas rutas son las rupas publicas para que las aplicaciones accedan al API.

    Cada ruta ejecuta una consulta SQL a POSTGRESQL

*/


const { Router } = require('express');
const router = Router();

const { getUsers, getAlbums, getArtists, getTracks, getUserById, createUser, updateUser, deleteUser, getStats, newArtist, newAlbum, newTrack } = require('../controllers/index');

//Aqui van todas las rutas para hacer las requests al API de Postgres
//Mediante router se define que tipo de REQUEST es .get, .post, .put, .delete, etc.

router.get('/users', getUsers);
router.get('/stats', getStats);
router.get('/albums', getAlbums);
router.get('/artists', getArtists);
router.get('/tracks', getTracks);
router.get('/user/:emailAddress/:password', getUserById);
router.post('/users', createUser);
router.post('/new-artist', newArtist);
router.post('/new-album', newAlbum);
router.post('/new-track', newTrack);
// router.put('/users/:id', updateUser)
router.put('/user/:emailAddress', updateUser)
router.delete('/users/:id', deleteUser);

//
module.exports = router;
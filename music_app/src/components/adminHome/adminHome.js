import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav/nav';
import Mods from './Modificaciones/modificaciones';
import NewArtist from './Modificaciones/NewArtist/newArtist';
import NewAlbum from './Modificaciones/NewAlbum/newAlbum';
import Stats from './Estadisticas/estadisticas';
import NewSong from './Modificaciones/NewSong/newSong';
import InactSong from './Modificaciones/InactSong/inactSong';
import ModTables from './Modificaciones/Modify/modifyTables';
import ModTrack from './Modificaciones/Modify/ModifyTrack/modTrack';
import ModArtist from './Modificaciones/Modify/ModifyArtist/modArtist';
import ModAlbum from './Modificaciones/Modify/ModifyAlbum/modAlbum';
import DeleteTables from './Modificaciones/Delete/deleteTables';
import DeleteTrack from './Modificaciones/Delete/DeleteTrack/deleteTrack';
import DeleteArtist from './Modificaciones/Delete/DeleteArtist/deleteArtist';
import DeleteAlbum from './Modificaciones/Delete/DeleteAlbum/deleteAlbum';

const AdminHome = () => {
    return (
    <Router>
        <div>
            <Nav/>
            <Route path='/admin-home' exact component={Home}/>
            <Route path='/admin-home/mods' exact component={Mods}/>
            <Route path='/admin-home/mods/new-artist' component={NewArtist}/>
            <Route path='/admin-home/mods/new-album' component={NewAlbum}/>
            <Route path='/admin-home/mods/new-song' component={NewSong}/>
            <Route path='/admin-home/mods/inact-song' component={InactSong}/>
            <Route path='/admin-home/mods/update' exact component={ModTables}/>
            <Route path='/admin-home/mods/update/song' component={ModTrack}/>
            <Route path='/admin-home/mods/update/artist' component={ModArtist}/>
            <Route path='/admin-home/mods/update/album' component={ModAlbum}/>
            <Route path='/admin-home/mods/delete' exact component={DeleteTables}/>
            <Route path='/admin-home/mods/delete/song' component={DeleteTrack}/>
            <Route path='/admin-home/mods/delete/artist' component={DeleteArtist}/>
            <Route path='/admin-home/mods/delete/album' component={DeleteAlbum}/>
            <Route path='/admin-home/stats' component={Stats}/>
        </div>
    </Router>
    )
};

const Home = () => {
    return(
        <div>
            Admin Home
        </div>
    )
}

export default AdminHome;
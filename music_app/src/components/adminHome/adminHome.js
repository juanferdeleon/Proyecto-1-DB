import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav/nav';
import Mods from './Modificaciones/modificaciones';
import NewArtist from './Modificaciones/NewArtist/newArtist';
import NewAlbum from './Modificaciones/NewAlbum/newAlbum';
import Stats from './Estadisticas/estadisticas';

const AdminHome = () => {
    return (
    <Router>
        <div>
            <Nav/>
            <Route path='/admin-home' exact component={Home}/>
            <Route path='/admin-home/mods' exact component={Mods}/>
            <Route path='/admin-home/mods/new-artist' component={NewArtist}/>
            <Route path='/admin-home/mods/new-album' component={NewAlbum}/>
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
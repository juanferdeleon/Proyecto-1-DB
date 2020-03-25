import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { configureStore } from '../../store';
import Register from '../register/register';
import Login from '../login/login';
import CreditCardForm from '../CreditCardForm/creditCardForm';
import UserHome from '../userHome/userHome';
import AdminHome from '../adminHome/adminHome';

import Nav from '../adminHome/Nav/nav';
import Mods from '../adminHome/Modificaciones/modificaciones';
import NewArtist from '../adminHome/Modificaciones/NewArtist/newArtist';
import NewAlbum from '../adminHome/Modificaciones/NewAlbum/newAlbum';
import Stats from '../adminHome/Estadisticas/estadisticas';
import NewSong from '../adminHome/Modificaciones/NewSong/newSong';
import InactSong from '../adminHome/Modificaciones/InactSong/inactSong';
import ModTables from '../adminHome/Modificaciones/Modify/modifyTables';
import ModTrack from '../adminHome/Modificaciones/Modify/ModifyTrack/modTrack';
import ModArtist from '../adminHome/Modificaciones/Modify/ModifyArtist/modArtist';
import ModAlbum from '../adminHome/Modificaciones/Modify/ModifyAlbum/modAlbum';
import DeleteTables from '../adminHome/Modificaciones/Delete/deleteTables';
import DeleteTrack from '../adminHome/Modificaciones/Delete/DeleteTrack/deleteTrack';
import DeleteArtist from '../adminHome/Modificaciones/Delete/DeleteArtist/deleteArtist';
import DeleteAlbum from '../adminHome/Modificaciones/Delete/DeleteAlbum/deleteAlbum';

const store = configureStore();

const App = () => (
    <Provider store = {store}>
      <Router>
        <Nav/>
        <Route path='/' exact component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/select-your-plan' component={CreditCardForm}/>
        <Route path='/admin-home' exact component={AdminHome}/>
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
        <Route path='/user-home' component={UserHome}/>
      </Router>
    </Provider>
)

export default App;

import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '../../store';
//import Register from '../register/register';
import Login from '../login/login';

const store = configureStore();

const App = () => (
    <Provider store = {store}>
      <Login />
    </Provider>
)

export default App;

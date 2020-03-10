import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '../../store';
import Register from '../register/register';

const store = configureStore();

const App = () => (
    <Provider store = {store}>
      <Register />
    </Provider>
)

export default App;

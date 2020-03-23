import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { configureStore } from '../../store';
import Register from '../register/register';
import Login from '../login/login';
import CreditCardForm from '../CreditCardForm/creditCardForm';

const store = configureStore();

const App = () => (
    <Provider store = {store}>
      <Router>
        <Route path='/' exact component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/select-your-plan' component={CreditCardForm}/>
      </Router>
    </Provider>
)

export default App;

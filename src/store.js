import { createStore } from 'redux';

import reducer from './reducers/index';


export const configureStore = () => {
  return createStore(reducer);
}

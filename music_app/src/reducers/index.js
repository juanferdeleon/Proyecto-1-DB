import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';

const reducer = combineReducers({
    auth,
    form: formReducer,
})

export default reducer;
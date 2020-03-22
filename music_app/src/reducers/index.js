import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth, * as authSelectors from './auth';

const reducer = combineReducers({
    auth,
    form: formReducer,
})

export default reducer;

export const getUser = state => authSelectors.getUser(state.auth)

export const getAuthMsg = state => authSelectors.getMsg(state.auth)
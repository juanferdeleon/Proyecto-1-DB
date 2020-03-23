import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth, * as authSelectors from './auth';
import stats, * as statsSelectors from './stats';

const reducer = combineReducers({
    auth,
    stats,
    form: formReducer,
})

export default reducer;

export const getUser = state => authSelectors.getUser(state.auth)

export const getAuthMsg = state => authSelectors.getMsg(state.auth)

export const getIsAuth = state => authSelectors.getIsAuth(state.auth)

export const getIsAdminUser = state => authSelectors.getIsAdminUser(state.auth)

export const getLoadingStats = state => statsSelectors.getIsLoading(state.stats)

export const getStats = (state, graphNum) => statsSelectors.getStats(state.stats, graphNum)
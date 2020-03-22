import * as types from '../types/auth';

const auth = (state = {user: null, isAuthenticated: false, isLoading: false, msg: ''}, action) => {
    switch(action.type) {
        case types.USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCES:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case types.AUTH_ERROR:
        case types.LOGIN_FAIL:
        case types.REGISTER_FAIL:
            return {
                ...state,
                ...action.payload,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        case types.CLEAR_ERRORS:
            return{
                ...state,
                msg: null
            }
        default: return state;
    }
}

export default auth;

export const getUser = state => state.user

export const getMsg = state => state.msg
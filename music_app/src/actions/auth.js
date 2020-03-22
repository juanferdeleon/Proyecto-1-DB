import * as types from '../types/auth';

export const loadUser = () => ({
    type: types.USER_LOADING
})

export const registerUser = (action) => ({
    ...action
})

export const loginUser = (action) => ({
    ...action
})

export const clearError = () => ({
    type: types.CLEAR_ERRORS
})
// Action imports
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT
} from '../actions/login'
import { callWebService } from '../actions/web_service'

export const login = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === LOGIN) {
        dispatch(callWebService(
            'POST',
            'auth/signin',
            null,
            bodyparams,
            LOGIN_SUCCESS,
            LOGIN_FAILED
        ))
    }
}

export const logout = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === LOGOUT) {
        dispatch(callWebService(
            'POST',
            'auth/logout',
            null,
            bodyparams,
            LOGOUT_SUCCESS,
            LOGOUT_FAILED
        ))
    }
}


export const loginMiddleware = [login, logout]
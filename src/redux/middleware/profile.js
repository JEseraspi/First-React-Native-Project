// Action imports
import { GET_LEVELS, GET_LEVELS_FAILED, GET_LEVELS_SUCESS, GET_PROFILE, GET_PROFILE_FAILED, GET_PROFILE_SUCESS, UPDATE_USERS, UPDATE_USERS_FAILED, UPDATE_USERS_SUCCESS } from '../actions/profile'
import { callWebService } from '../actions/web_service'

export const getProfile = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === GET_PROFILE) {
        dispatch(callWebService(
            'GET',
            'users/profile',
            null,
            null,
            GET_PROFILE_SUCESS,
            GET_PROFILE_FAILED
        ))
    }
}

export const getLevels = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === GET_LEVELS) {
        dispatch(callWebService(
            'GET',
            'levels',
            null,
            null,
            GET_LEVELS_SUCESS,
            GET_LEVELS_FAILED
        ))
    }
}

export const updateUsers = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === UPDATE_USERS) {
        dispatch(callWebService(
            'PUT',
            'users',
            null,
            bodyparams,
            UPDATE_USERS_SUCCESS,
            UPDATE_USERS_FAILED
        ))
    }
}


export const profileMiddleware = [getLevels, getProfile, updateUsers]
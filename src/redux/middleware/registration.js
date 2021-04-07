// Action imports
import {
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    REGISTER_PIN,
    REGISTER_PIN_SUCCESS,
    REGISTER_PIN_FAILED,
} from '../actions/registration'
import { callWebService } from '../actions/web_service'

export const registerUser = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === REGISTER_USER) {
        dispatch(callWebService(
            'POST',
            'auth/verify',
            null,
            bodyparams,
            REGISTER_USER_SUCCESS,
            REGISTER_USER_FAILED
        ))
    }
}

export const registerPassword = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === REGISTER_PIN) {
        dispatch(callWebService(
            'POST',
            `auth/setup`,
            null,
            bodyparams.data,
            REGISTER_PIN_SUCCESS,
            REGISTER_PIN_FAILED
        ))
    }
}


export const registrationMiddleWare = [registerUser, registerPassword]
// Action imports
import {
    REGISTER_NICKNAME,
    NICKNAME_FAILED,
    NICKNAME_SUCCESS
} from '../actions/nickname'
import { callWebService } from '../actions/web_service'

export const registerNickName = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === REGISTER_NICKNAME) {
        dispatch(callWebService(
            'PUT',
            'verify/nickname',
            null,
            bodyparams,
            NICKNAME_SUCCESS,
            NICKNAME_FAILED
        ))
    }
}

export const nicknameMiddleware = [registerNickName]
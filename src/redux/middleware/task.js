// Action imports
import {
    SEND_TASK,
    SEND_TASK_FAILED,
    SEND_TASK_SUCCESS
} from '../actions/task'
import { callWebService } from '../actions/web_service'

export const sendTask = ({ dispatch }) => next => action => {
    const bodyparams = action.payload

    next(action)
    if (action.type === SEND_TASK) {
        dispatch(callWebService(
            'POST',
            'level/requirement',
            null,
            bodyparams,
            SEND_TASK_SUCCESS,
            SEND_TASK_FAILED
        ))
    }
}

export const taskMiddleware = [sendTask]
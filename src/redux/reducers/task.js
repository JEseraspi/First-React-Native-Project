import { SEND_TASK_FAILED, SEND_TASK_SUCCESS } from '../actions/task'

const initialState = {
    success_message: "",
    error_message: "",
}

export const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_TASK_SUCCESS: 
            return {...state, success_message: 'send task success'}
        case SEND_TASK_FAILED:
            return {...state, error_message: action.payload.message}
        // case NICKNAME_CLEAR: 
        //     return {...state, error_message: '', success_message: ''}
        default: 
            return state
    }
}
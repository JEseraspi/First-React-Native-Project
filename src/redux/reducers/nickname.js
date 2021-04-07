import { NICKNAME_FAILED, NICKNAME_SUCCESS, NICKNAME_CLEAR } from '../actions/nickname'

const initialState = {
    success_message: "",
    error_message: "",
}

export const nicknameReducer = (state = initialState, action) => {
    switch(action.type) {
        case NICKNAME_SUCCESS: 
            return {...state, success_message: 'nickname success'}
        case NICKNAME_FAILED:
            return {...state, error_message: action.payload.message}
        case NICKNAME_CLEAR: 
            return {...state, error_message: '', success_message: ''}
        default: 
            return state
    }
}
import { CHECK_TOKEN_FIRST_FAILED, CHECK_TOKEN_FIRST_SUCCESS, CLEAR_TOKEN_MESSAGE } from '../actions/checktoken'

const initialState = {
    token_success_message: "",
    token_error_message: "",
}

export const checkTokenReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHECK_TOKEN_FIRST_SUCCESS: 
            return {...state, token_success_message: 'token success'}
        case CHECK_TOKEN_FIRST_FAILED:
            return {...state, token_error_message: action.payload.message}
        case CLEAR_TOKEN_MESSAGE: 
            return {...state, token_error_message: '', token_success_message: ''}
        default: 
            return state
    }
}
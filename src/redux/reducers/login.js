import { LOGIN_FAILED, LOGIN_SUCCESS, CLEAR_LOGIN, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED } from '../actions/login'

const initialState = {
    success_message: "",
    error_message: "",
    logout_error_message: "",
    logout_success_message: "",
    userdata: ""
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, userdata: action.payload, success_message: 'login success' }
        case LOGIN_FAILED:
            return { ...state, error_message: action.payload.message }
        case LOGOUT_SUCCESS:
            return { ...state, logout_success_message: 'logout success' }
        case LOGOUT_FAILED:
            return { ...state, logout_error_message: action.payload.message }
        case CLEAR_LOGIN:
            return { ...state, error_message: '', success_message: '' }
        default:
            return state
    }
}
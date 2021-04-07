import { REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_CLEAR, REGISTER_PIN_SUCCESS, REGISTER_PIN_FAILED } from '../actions/registration'

const initialState = {
    success_message: "",
    payload: null,
    userdata: null,
    error_message: "",
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return { ...state, success_message: 'register success', payload: action.payload }
        case REGISTER_USER_FAILED:
            return { ...state, error_message: action.payload.message }
        case REGISTER_PIN_SUCCESS:
            return { ...state, success_message: 'register pin success', userdata: action.payload }
        case REGISTER_PIN_FAILED:
            return { ...state, error_message: action.payload.message }
        case REGISTER_CLEAR:
            return { ...state, error_message: '', success_message: '' }
        default:
            return state
    }
}


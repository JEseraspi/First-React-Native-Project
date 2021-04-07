import { RESEND_OTP_FAILED, VERIFY_SUCCESS, VERIFY_FAILED, RESEND_OTP_SUCCESS, CLEAR_VERIFY } from '../actions/verify'

const initialState = {
    verify_data: null,
    verify_success_message: "",
    verify_error_message: "",
    resend_success_message: "",
    resend_error_message: "",
}

export const verifyReducer = (state = initialState, action) => {
    switch(action.type) {
        case VERIFY_SUCCESS: 
            return {...state, verify_success_message: 'verify success', verify_data: action.payload}
        case VERIFY_FAILED:
            return {...state, verify_error_message: action.payload.message}
        case RESEND_OTP_SUCCESS: 
            return {...state, resend_success_message: 'resend verify success'}
        case RESEND_OTP_FAILED:
            return {...state, resend_error_message: action.payload.message}
        case CLEAR_VERIFY:
            return {
                ...state,    
                verify_success_message: "",
                verify_error_message: "",
                resend_success_message: "",
                resend_error_message: "",
            }
        default: 
            return state
    }
}


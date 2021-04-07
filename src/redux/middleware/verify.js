// Action imports
import {
    VERIFY_OTP,
    VERIFY_SUCCESS,
    VERIFY_FAILED,
    RESEND_VERIFY,
    RESEND_OTP_SUCCESS,
    RESEND_OTP_FAILED
} from '../actions/verify'

import { callWebService } from '../actions/web_service'

export const verifyOTP = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === VERIFY_OTP) {
        dispatch(callWebService(
            'POST',
            `auth/otp/verify/${action.params}`,
            null,
            bodyparams,
            VERIFY_SUCCESS,
            VERIFY_FAILED
        ))
    }
}

export const resendVerifyOTP = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === RESEND_VERIFY) {
        dispatch(callWebService(
            'PATCH',
            `auth/otp/resend/${action.params}`,
            null,
            bodyparams,
            RESEND_OTP_SUCCESS,
            RESEND_OTP_FAILED
        ))
    }
}


export const verifyMiddleWare = [resendVerifyOTP, verifyOTP]
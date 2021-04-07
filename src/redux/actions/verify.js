export const VERIFY_OTP = '[app] start verify'
export const RESEND_VERIFY = '[app] resend verify '
export const VERIFY_SUCCESS = '[app] verify success'
export const VERIFY_FAILED = '[app] verify failed'
export const RESEND_OTP_SUCCESS = '[app] resend otp success'
export const RESEND_OTP_FAILED = '[app] resend otp failed'
export const CLEAR_VERIFY = '[app] clear verify'

export const verifyOTP = (data, params) => ({
    type: VERIFY_OTP,
    payload: data,
    params: params,
})

export const resendOTP = (data, params) => ({
    type: RESEND_VERIFY,
    payload: data,
    params: params,

})

export const clearVerify = () => ({
    type: CLEAR_VERIFY,
})

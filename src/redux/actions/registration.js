export const REGISTER_USER = '[app] start registration'
export const REGISTER_USER_SUCCESS = '[app] registration success'
export const REGISTER_USER_FAILED = '[app] registration failed'
export const REGISTER_CACHE = '[app] registration cache'
export const REGISTER_CLEAR = '[app] registration clear'
export const REGISTER_PIN = '[app] pincode registration'
export const REGISTER_PIN_SUCCESS = '[app] pincode success'
export const REGISTER_PIN_FAILED = '[app] pincode failed'

export const registerUser = (params) => ({
    type: REGISTER_USER,
    payload: params
})

export const saveSession = (data) => ({
    type: REGISTER_CACHE,
    payload: data
})  

export const registerClear = () => ({
    type: REGISTER_CLEAR
}) 

export const registerPassword = (data, params) => ({
    type: REGISTER_PIN,
    payload: {
        data: data,
        params: params
    },
}) 
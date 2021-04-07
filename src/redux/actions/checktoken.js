export const CHECK_TOKEN = '[check token service] Fetching'
export const SAVE_TOKEN = '[check token service] save token' 

export const CHECK_TOKEN_FIRST = '[check token service] Fetching first'
export const CHECK_TOKEN_FIRST_SUCCESS = '[check token service] success token first' 
export const CHECK_TOKEN_FIRST_FAILED = '[check token service] failed token first' 
export const CLEAR_TOKEN_MESSAGE = '[check token service] clear token first' 

export const callCheckToken = (method, contextPath, params, data, onSuccess, onError) => ({
    type: CHECK_TOKEN,
    payload: data,
    meta: {method, contextPath, params, data, onSuccess, onError}
})

export const checkToken = (data) => ({
    type: CHECK_TOKEN_FIRST,
    payload: data,
})


export const clearCheckToken = (data) => ({
    type: CLEAR_TOKEN_MESSAGE,
    payload: data,
})
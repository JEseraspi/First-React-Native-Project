export const API_REQUEST = '[web service] Fetching'
export const SAVE_TOKEN = '[web service] save token' 

export const callWebService = (method, contextPath, params, data, onSuccess, onError) => ({
    type: API_REQUEST,
    payload: data,
    meta: {method, contextPath, params, data, onSuccess, onError}
})
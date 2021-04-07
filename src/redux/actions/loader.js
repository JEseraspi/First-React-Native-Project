export const SHOW_LOADER = '[ui] showing loader'
export const HIDE_LOADER = '[ui] hiding loader'

export const showLoader = (message) => ({
    type: SHOW_LOADER,
    payload: message
})

export const hideLoader = () => ({
    type: HIDE_LOADER
})
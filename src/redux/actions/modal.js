export const SHOW_MODAL = '[ui] showing modal'
export const HIDE_MODAL = '[ui] hiding modal'

export const showModal = (message, action, header, extension) => ({
    type: SHOW_MODAL,
    payload: {
        message,
        action,
        header,
        extension
    }
})

export const hideModal = () => ({
    type: HIDE_MODAL
})
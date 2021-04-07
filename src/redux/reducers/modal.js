import { SHOW_MODAL, HIDE_MODAL } from '../actions/modal'

const initialState = {
    visibility: false,
    message: '',
    action: {
        url: '',
        label: ''
    },
    header: ''
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_MODAL: 
            return {
                ...state,
                visibility: true,
                message: action.payload.message,
                action: action.payload.action,
                header: action.payload.header,
                extension : action.payload.extension
            }
        case HIDE_MODAL:
            return {...state, visibility: false}
        default: 
            return state
    }
}
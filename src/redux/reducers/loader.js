import { SHOW_LOADER, HIDE_LOADER } from '../actions/loader'

const initialState = {
    visibility: false,
    message: '',
}

export const loaderReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_LOADER: 
            return {...state, visibility: true, message: action.payload}
        case HIDE_LOADER:
            return {...state, visibility: false}
        default: 
            return state
    }
}


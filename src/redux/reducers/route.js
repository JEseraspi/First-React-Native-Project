import { CHANGE_ROUTE_SUCCESS } from '../actions/route'

const initialState = {
    active_route: "",
}

export const routeReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_ROUTE_SUCCESS: 
            return {...state, active_route: action.payload}
        default: 
            return state
    }
}
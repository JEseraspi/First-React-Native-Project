// Action imports
import {
    CHANGE_ROUTE,
    CHANGE_ROUTE_SUCCESS
} from '../actions/route'
import { Actions } from 'react-native-router-flux'

export const changeRoute = ({ dispatch }) => next => action => {
    const bodyparams = action.payload
    next(action)
    if (action.type === CHANGE_ROUTE) {
        console.log('pasok')
        switch(bodyparams) {
            case 'home':
                Actions.home()
            break;
            case 'journal':
                Actions.journal()
            break;
            case 'resources':
                Actions.resources()
            break;
            case 'profile':
                Actions.profile()
            break;
            default:
                Actions.welcome()
            break;
        }
        
        dispatch({
            type: CHANGE_ROUTE_SUCCESS,
            payload: bodyparams
        })
    }
}

export const routeMiddleware = [changeRoute]
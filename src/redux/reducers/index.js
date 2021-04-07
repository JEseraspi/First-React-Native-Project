// Redux Imports
import { combineReducers } from 'redux'

// Reducer Imports
import { registerReducer } from './registration'
import { verifyReducer } from './verify'
import { loaderReducer } from './loader'
import { modalReducer } from './modal'
import { nicknameReducer } from './nickname'
import { loginReducer } from './login'
import { routeReducer } from './route'
import { journalReducer } from './journal'
import { homeReducer } from './home'
import { resourcesReducer } from './resources'
import { profileReducer } from './profile'
import { taskReducer } from './task'
import { checkTokenReducer } from './checktoken'

export const rootReducer = (state, action) => {
    // Clear all data in redux store to initial.
    if (action.type === DESTROY_SESSION)
        state = undefined;
    return appReducer(state, action);
};

export const reducers = combineReducers({
    registerReducer,
    verifyReducer,
    loaderReducer,
    modalReducer,
    nicknameReducer,
    loginReducer,
    routeReducer,
    journalReducer,
    homeReducer,
    resourcesReducer,
    profileReducer,
    taskReducer,
    checkTokenReducer
})


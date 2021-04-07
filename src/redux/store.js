// Redux Imports
import { applyMiddleware, createStore, compose } from 'redux'
import { reducers } from './reducers'
import { webServiceMiddleWare } from './middleware/web_service'
import { registrationMiddleWare } from './middleware/registration'
import { verifyMiddleWare } from './middleware/verify'
import { nicknameMiddleware } from './middleware/nickname'
import { loginMiddleware } from './middleware/login'
import { journalMiddleware } from './middleware/journal'
import { homeMiddleware } from './middleware/home'
import { resourcesMiddlware } from './middleware/resources'
import { checkTokenMiddleware } from './middleware/checktoken'
import { profileMiddleware } from './middleware/profile'
import { taskMiddleware } from './middleware/task'


// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            webServiceMiddleWare,
            ...checkTokenMiddleware,
            // ...routeMiddleware,
            ...registrationMiddleWare,
            ...verifyMiddleWare,
            ...nicknameMiddleware,
            ...loginMiddleware,
            ...journalMiddleware,
            ...homeMiddleware,
            ...resourcesMiddlware,
            ...profileMiddleware,
            ...taskMiddleware
        )
    )
)


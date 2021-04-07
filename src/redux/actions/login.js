export const LOGIN = '[app] start login'
export const LOGIN_SUCCESS = '[app] login success'
export const LOGIN_FAILED = '[app] login failed'
export const CLEAR_LOGIN = '[app] clear login'

export const LOGOUT = '[app] start logout'
export const LOGOUT_SUCCESS = '[app] logout success'
export const LOGOUT_FAILED = '[app] logout failed'

export const DESTROY_SESSION = '[app] on logout destroy sessions'

export const login = (data) => ({
    type: LOGIN,
    payload: data
})

export const logoutPost = (data) => ({
    type: LOGOUT,
    payload: data
})


export const clearLogin = () => ({
    type: CLEAR_LOGIN
})

export const onLogout = () => {
    return dispatch => {
       // Your code here...
       dispatch({ type: DESTROY_SESSION });
    };
 }
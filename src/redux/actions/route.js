export const ROUTES = '[app] start route'
export const CHANGE_ROUTE = '[app] change route'
export const CHANGE_ROUTE_SUCCESS = '[app] change route'

export const changeRoute = (route) => ({
    type: CHANGE_ROUTE,
    payload: route
})
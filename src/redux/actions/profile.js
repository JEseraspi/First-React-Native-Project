export const GET_LEVELS = '[profile] get levels'
export const GET_LEVELS_SUCESS = '[profile] get levels success' 
export const GET_LEVELS_FAILED = '[profile] get levels failed' 
export const CLEAR_LEVELS = '[profile] get levels clear' 

export const GET_PROFILE = '[profile] get profile data' 
export const GET_PROFILE_SUCESS = '[profile] get profile success' 
export const GET_PROFILE_FAILED = '[profile] get profile failed' 
export const CLEAR_PROFILE = '[profile] get profile clear' 

export const UPDATE_USERS = '[profile] update profile data' 
export const UPDATE_USERS_SUCCESS = '[profile] update profile success' 
export const UPDATE_USERS_FAILED = '[profile] update profile failed' 
export const CLEAR_UPDATE = '[profile] update profile clear' 

export const getProfile = () => ({
    type: GET_PROFILE
})

export const getLevels = () => ({
    type: GET_LEVELS
})

export const clearLevels = () => ({
    type: CLEAR_LEVELS
})

export const clearProfile = () => ({
    type: CLEAR_PROFILE
})

export const updateUsers = (data) => ({
    type: UPDATE_USERS,
    payload: data
})
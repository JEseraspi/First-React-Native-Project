import { CLEAR_LEVELS, CLEAR_PROFILE, CLEAR_UPDATE, GET_LEVELS_FAILED, GET_LEVELS_SUCESS, GET_PROFILE_FAILED, GET_PROFILE_SUCESS, UPDATE_USERS, UPDATE_USERS_FAILED, UPDATE_USERS_SUCCESS } from '../actions/profile'

const initialState = {
    profile_data: null,
    profile_success_message: "",
    profile_error_message: "",
    levels: null,
    levels_success_message: "",
    levels_error_message: "",
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEVELS_SUCESS:
            return { ...state, levels_success_message: 'get levels success', levels: action.payload }
        case GET_LEVELS_FAILED:
            return { ...state, levels_error_message: action.payload.message }
        case CLEAR_LEVELS:
            return { ...state, levels_error_message: '', levels_success_message: '' }
        case GET_PROFILE_SUCESS:
            return { ...state, profile_success_message: 'get profile success', profile_data: action.payload }
        case GET_PROFILE_FAILED:
            return { ...state, profile_error_message: action.payload.message }
        case CLEAR_PROFILE:
            return { ...state, profile_error_message: '', profile_success_message: '' }
        case UPDATE_USERS_SUCCESS:
            return { ...state, profile_success_message: 'update profile success', profile_data: action.payload }
        case UPDATE_USERS_FAILED:
            return { ...state, profile_error_message: action.payload.message }
        case CLEAR_UPDATE:
            return { ...state, profile_error_message: '', profile_success_message: '' }
        default:
            return state
    }
}
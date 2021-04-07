export const NICKNAME_SUCCESS = '[app] nickname success'
export const NICKNAME_FAILED = '[app] nickname failed'
export const REGISTER_NICKNAME = '[app] nickname registration'
export const NICKNAME_CLEAR = '[app] nickname clear'

export const registerNickName = (data) => ({
    type: REGISTER_NICKNAME,
    payload: data
}) 

export const clearNickname = () => ({
    type: NICKNAME_CLEAR,
}) 
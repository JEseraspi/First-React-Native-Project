// Action Imports
import { CHECK_TOKEN, CHECK_TOKEN_FIRST, CHECK_TOKEN_FIRST_FAILED, CHECK_TOKEN_FIRST_SUCCESS } from '../actions/checktoken'
// Custom Imports
import axios from 'axios'
import { config, getAccessToken, refreshKey, setAccessToken } from '../../helper/token'
import { callWebService } from '../actions/web_service'
import SecureStorage from 'react-native-secure-storage'
import { HIDE_LOADER, SHOW_LOADER } from '../actions/loader'
import jwt_decode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'
import * as RootNavigation from '../../helper/navigate_service'

export const checkToken = ({ dispatch }) => next => action => {
    if (action.type === CHECK_TOKEN) {
        const { method, contextPath, data, params, onSuccess, onError } = action.meta
        SecureStorage.getItem(refreshKey, config).then(refresh_token => {
            console.log(refresh_token, 'refresh_token')
            axios({
                method: 'POST',
                url: `${'https://insynergy-api-v2.herokuapp.com/v1/api/auth/refresh_token/'}`,
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken()
                },
                data: {
                    refresh_token: refresh_token
                }
            }).then(async (_data) => {
                let decryptedData = _data.data;
                console.log(decryptedData, 'refresh success')
                if (decryptedData.status === 200) {
                    setAccessToken(decryptedData.body.access_token)
                    dispatch(callWebService(method, contextPath, data, params, onSuccess, onError))
                } else if (decryptedData.status === 201) {
                    setAccessToken(decryptedData.body.access_token)
                    dispatch(callWebService(method, contextPath, data, params, onSuccess, onError))
                } else if (decryptedData.status === 401) {
                    RootNavigation.navigate(`TimeoutModal`)
                } else {
                    dispatch({
                        type: onError, payload: decryptedData
                    })
                }
                dispatch({
                    type: HIDE_LOADER
                })
            }).catch((error) => {
                let decryptedData = error.response.data;
                console.log(decryptedData, 'error_refresh')
                RootNavigation.navigate(`TimeoutModal`)
                dispatch({
                    type: onError, payload: decryptedData
                })
                dispatch({
                    type: HIDE_LOADER
                })
            })
        })
    }
    return next(action)
}

export const checkTokenFirst = ({ dispatch }) => next => action => {
    if (action.type === CHECK_TOKEN_FIRST) {
        let exp = getAccessToken() ? jwt_decode(getAccessToken()).exp : null
        if ((exp && Date.now() - 15000 >= exp * 1000)) {
            SecureStorage.getItem(refreshKey, config).then(refresh_token => {
                axios({
                    method: 'POST',
                    url: `${'https://insynergy-api-v2.herokuapp.com/v1/api/auth/refresh_token/'}`,
                    headers: {
                        'Authorization': 'Bearer ' + getAccessToken()
                    },
                    data: {
                        refresh_token: refresh_token
                    }
                }).then(async (_data) => {
                    let decryptedData = _data.data;
                    if (decryptedData.status === 200) {
                        setAccessToken(decryptedData.body.access_token)
                        dispatch({
                            type: CHECK_TOKEN_FIRST_SUCCESS
                        })
                    } else if (decryptedData.status === 201) {
                        setAccessToken(decryptedData.body.access_token)
                        dispatch({
                            type: CHECK_TOKEN_FIRST_SUCCESS
                        })
                    } else if (decryptedData.status === 401) {
                        Actions.timeout({ type: 'reset' })
                    } else {
                        dispatch({
                            type: CHECK_TOKEN_FIRST_FAILED, payload: decryptedData
                        })
                    }
                    dispatch({
                        type: HIDE_LOADER
                    })
                }).catch((error) => {
                    let decryptedData = error.response.data;
                    Actions.timeout({ type: 'reset' })
                    dispatch({
                        type: CHECK_TOKEN_FIRST_FAILED, payload: decryptedData
                    })
                    dispatch({
                        type: HIDE_LOADER
                    })
                })
            })
        } else {
            dispatch({
                type: CHECK_TOKEN_FIRST_SUCCESS
            })
        }
    }
    return next(action)
}

export const checkTokenMiddleware = [checkToken, checkTokenFirst]
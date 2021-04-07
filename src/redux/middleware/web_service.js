// Action Imports
import { API_REQUEST } from '../actions/web_service'
import { showModal } from '../actions/modal'
import { showLoader, hideLoader, SHOW_LOADER, HIDE_LOADER } from '../actions/loader'

// Custom Imports
import axios from 'axios'
import { getAccessToken } from '../../helper/token'
import jwt_decode from 'jwt-decode'
import { callCheckToken } from '../actions/checktoken'

export const api = ({ dispatch }) => next => action => {
    if (action.type === API_REQUEST) {
        const { method, contextPath, data, params, onSuccess, onError } = action.meta
        let exp = getAccessToken() ? jwt_decode(getAccessToken()).exp : null

        // console.log(exp && Date.now() >= exp * 1000, 'exp')
        // console.log(exp)
        if ((exp && Date.now() - 15000 >= exp * 1000)) {
            dispatch(callCheckToken(method, contextPath, params, data, onSuccess, onError))
        } else {
            axios({
                method,
                url: `${'https://insynergy-api-v2.herokuapp.com/v1/api/'}${contextPath}`,
                params,
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken()
                },
                data: data
            }).then((data) => {
                console.log('check',data)
                let decryptedData = data.data;
                // console.log(decryptedData, 'decryptedData')
                if (decryptedData.status === 200) {
                    dispatch({
                        type: onSuccess, payload: decryptedData.body
                    })
                } else if (decryptedData.status === 201) {
                    dispatch({
                        type: onSuccess, payload: decryptedData.body
                    })
                } else {
                    dispatch({
                        type: onError, payload: decryptedData
                    })
                }
                dispatch({
                    type: HIDE_LOADER
                })

            }).catch((error) => {
                console.log(error, 'error pota')
                let decryptedData = error.response.data;
                console.log(decryptedData, 'error')
                dispatch({
                    type: onError, payload: decryptedData
                })
                dispatch({
                    type: HIDE_LOADER
                })
            })
        }


    }
    return next(action)
}

export const webServiceMiddleWare = api

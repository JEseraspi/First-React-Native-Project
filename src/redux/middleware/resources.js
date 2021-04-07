// Action imports
import {
    GET_ARTICLES,
    GET_ARTICLES_FAILED,
    GET_ARTICLES_SUCCESS,
    GET_TOPICS,
    GET_TOPICS_FAILED,
    GET_TOPICS_SUCCESS,
    GET_VIDEOS,
    GET_VIDEOS_FAILED,
    GET_VIDEOS_SUCCESS
} from '../actions/resources'
import { callWebService } from '../actions/web_service'

export const getTopics = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === GET_TOPICS) {
        dispatch(callWebService(
            'GET',
            `topics${bodyparams ? bodyparams : ''}`,
            null,
            null,
            GET_TOPICS_SUCCESS,
            GET_TOPICS_FAILED
        ))
    }
}

export const getVideos = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === GET_VIDEOS) {
        dispatch(callWebService(
            'GET',
            `videos${bodyparams ? bodyparams : ''}`,
            null,
            null,
            GET_VIDEOS_SUCCESS,
            GET_VIDEOS_FAILED
        ))
    }
}

export const getArticles = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === GET_ARTICLES) {
        dispatch(callWebService(
            'GET',
            `articles${bodyparams ? bodyparams : ''}`,
            null,
            null,
            GET_ARTICLES_SUCCESS,
            GET_ARTICLES_FAILED
        ))
    }
}


export const resourcesMiddlware = [getArticles, getVideos, getTopics]
// Action imports
import {
    GET_DAILY_AFFIRMATION,
    GET_DAILY_AFFIRMATION_FAILED,
    GET_DAILY_AFFIRMATION_SUCCESS,
    GET_FEATURED_ARTICLES,
    GET_FEATURED_ARTICLES_SUCCESS,
    GET_FEATURED_ARTICLES_FAILED,
    GET_FEATURED_VIDEOS,
    GET_FEATURED_VIDEOS_FAILED,
    GET_FEATURED_VIDEOS_SUCCESS,
    GET_QUESTIONAIRE,
    GET_QUESTIONAIRE_SUCCESS,
    GET_QUESTIONAIRE_FAILED,
    ANSWER_QUESTIONAIRE,
    ANSWER_QUESTIONAIRE_FAILED,
    ANSWER_QUESTIONAIRE_SUCCESS
} from '../actions/home'
import { callWebService } from '../actions/web_service'

export const getDailyAffirmationQuotes = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === GET_DAILY_AFFIRMATION) {
        dispatch(callWebService(
            'GET',
            `quotes`,
            null,
            null,
            GET_DAILY_AFFIRMATION_SUCCESS,
            GET_DAILY_AFFIRMATION_FAILED
        ))
    }
}

export const getFeaturedVideos = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === GET_FEATURED_VIDEOS) {
        dispatch(callWebService(
            'GET',
            `videos?is_featured=true`,
            null,
            null,
            GET_FEATURED_VIDEOS_SUCCESS,
            GET_FEATURED_VIDEOS_FAILED
        ))
    }
}

export const getFeaturedArticles = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === GET_FEATURED_ARTICLES) {
        dispatch(callWebService(
            'GET',
            `articles?is_featured=true`,
            null,
            null,
            GET_FEATURED_ARTICLES_SUCCESS,
            GET_FEATURED_ARTICLES_FAILED
        ))
    }
}


export const getQuestionaire = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    
    if (action.type === GET_QUESTIONAIRE) {
        dispatch(callWebService(
            'GET',
            `questionaire/${bodyparams}`,
            null,
            null,
            GET_QUESTIONAIRE_SUCCESS,
            GET_QUESTIONAIRE_FAILED
        ))
    }
}


export const answerQuestionaire = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === ANSWER_QUESTIONAIRE) {
        dispatch(callWebService(
            'POST',
            `questionaire/answer/${action.payload.params}`,
            null,
            bodyparams.body,
            ANSWER_QUESTIONAIRE_SUCCESS,
            ANSWER_QUESTIONAIRE_FAILED
        ))
    }
}


export const homeMiddleware = [getDailyAffirmationQuotes, getFeaturedVideos, getFeaturedArticles, getQuestionaire, answerQuestionaire]
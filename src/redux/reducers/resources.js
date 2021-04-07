import { 
    GET_ARTICLES_FAILED, 
    GET_TOPICS_FAILED,
    GET_ARTICLES_SUCCESS,
    GET_TOPICS_SUCCESS,
    GET_VIDEOS_FAILED,
    GET_VIDEOS_SUCCESS,
    VIDEOS_CLEAR,
    TOPICS_CLEAR,
    ARTICLES_CLEAR,
    GET_TOPICS_LOADED,
    GET_VIDEOS_LOADED,
    GET_ARTICLES_LOADED
} from '../actions/resources'

const initialState = {
    topics: [],
    videos: [],
    articles: [],
    topics_loaded: false,
    videos_loaded: false,
    articles_loaded: false,
    get_articles_success_message: "",
    get_articles_error_message: "",
    get_videos_success_message: "",
    get_videos_error_message: "",
    get_topics_success_message: "",
    get_topics_error_message: "",
}

export const resourcesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TOPICS_SUCCESS: 
            return {...state, topics: action.payload, get_topics_success_message: 'get topics success'}
        case GET_TOPICS_FAILED:
            return {...state, get_topics_error_message: action.payload.message}
        case TOPICS_CLEAR: 
            return {...state, get_topics_error_message: '', get_topics_success_message: ''}
        case GET_ARTICLES_SUCCESS: 
            return {...state, articles: action.payload, get_articles_success_message: 'get articles success'}
        case GET_ARTICLES_FAILED:
            return {...state, get_articles_error_message: action.payload.message}
        case ARTICLES_CLEAR: 
            return {...state, get_articles_error_message: '', get_articles_success_message: ''}
        case GET_VIDEOS_SUCCESS: 
            return {...state, videos: action.payload, get_videos_success_message: 'get videos success'}
        case GET_VIDEOS_FAILED:
            return {...state, get_videos_error_message: action.payload.message}
        case VIDEOS_CLEAR: 
            return {...state, get_videos_error_message: '', get_videos_success_message: ''}
        case GET_TOPICS_LOADED:
            return {...state, topics_loaded: action.payload}
        case GET_VIDEOS_LOADED:
            return {...state, videos_loaded: action.payload}
        case GET_ARTICLES_LOADED:
            return {...state, articles_loaded: action.payload}
        default: 
            return state
    }
}
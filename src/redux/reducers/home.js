import { 
    GET_DAILY_AFFIRMATION_SUCCESS, 
    GET_DAILY_AFFIRMATION_FAILED,
    DAILY_AFFIMARTION_CLEAR,
    GET_FEATURED_ARTICLES_FAILED,
    GET_FEATURED_ARTICLES_SUCCESS,
    GET_FEATURED_VIDEOS_FAILED,
    GET_FEATURED_VIDEOS_SUCCESS,
    FEATURED_ARTICLES_CLEAR,
    FEATURED_VIDEOS_CLEAR, 
    GET_QUESTIONAIRE_FAILED,
    GET_QUESTIONAIRE_SUCCESS,
    GET_QUESTIONAIRE_CLEAR,
    GET_QUESTIONAIRE_LOADED,
    GET_FEATURED_ARTICLES_LOADED,
    GET_FEATURED_VIDEOS_LOADED,
    GET_DAILY_AFFIRMATION_LOADED,
    ANSWER_QUESTIONAIRE_CLEAR,
    ANSWER_QUESTIONAIRE_SUCCESS,
    ANSWER_QUESTIONAIRE_FAILED
} from '../actions/home'

const initialState = {
    daily_quotes: [],
    featured_videos: [],
    featured_articles: [],
    questionaire_data: [],
    videos_loaded: false,
    articles_loaded: false,
    quotes_loaded: false,
    questionaire_loaded: false,
    get_articles_success_message: "",
    get_articles_error_message: "",
    get_videos_success_message: "",
    get_videos_error_message: "",
    get_quotes_success_message: "",
    get_quotes_error_message: "",
    get_questionaire_success_message: "",
    get_questionaire_error_message: "",
    answer_questionaire_success_message: "",
    answer_questionaire_error_message: "",
}

export const homeReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DAILY_AFFIRMATION_SUCCESS: 
            return {...state, daily_quotes: action.payload, get_quotes_success_message: 'get daily quotes success', quotes_loaded: true}
        case GET_DAILY_AFFIRMATION_FAILED:
            return {...state, get_quotes_error_message: action.payload.message}
        case DAILY_AFFIMARTION_CLEAR: 
            return {...state, get_quotes_error_message: '', get_quotes_success_message: ''}
        case GET_FEATURED_ARTICLES_SUCCESS: 
            return {...state, featured_articles: action.payload, get_articles_success_message: 'get featured articles success', articles_loaded: true}
        case GET_FEATURED_ARTICLES_FAILED:
            return {...state, get_articles_error_message: action.payload.message}
        case FEATURED_ARTICLES_CLEAR: 
            return {...state, get_articles_error_message: '', get_articles_success_message: ''}
        case GET_FEATURED_VIDEOS_SUCCESS: 
            return {...state, featured_videos: action.payload, get_videos_success_message: 'get featured videos success', videos_loaded: true}
        case GET_FEATURED_VIDEOS_FAILED:
            return {...state, get_videos_error_message: action.payload.message}
        case FEATURED_VIDEOS_CLEAR: 
            return {...state, get_videos_error_message: '', get_videos_success_message: ''}
        case GET_QUESTIONAIRE_SUCCESS: 
            return {...state, questionaire_data: action.payload, get_questionaire_success_message: 'get questionaire success', questionaire_loaded: true}
        case GET_QUESTIONAIRE_FAILED:
            return {...state, get_questionaire_error_message: action.payload.message}
        case GET_QUESTIONAIRE_LOADED:
            return {...state, questionaire_loaded: action.payload} 
        case GET_FEATURED_ARTICLES_LOADED:
            return {...state, articles_loaded: action.payload} 
        case GET_FEATURED_VIDEOS_LOADED:
            return {...state, videos_loaded: action.payload} 
        case GET_DAILY_AFFIRMATION_LOADED:
            return {...state, quotes_loaded: action.payload} 
        case GET_QUESTIONAIRE_CLEAR: 
            return {...state, get_questionaire_error_message: '', get_questionaire_success_message: ''}
        case ANSWER_QUESTIONAIRE_SUCCESS: 
            return {...state, answer_questionaire_success_message: 'answer questionaire success'}
        case ANSWER_QUESTIONAIRE_FAILED:
            return {...state, answer_questionaire_error_message: action.payload.message}
        case ANSWER_QUESTIONAIRE_CLEAR: 
            return {...state, answer_questionaire_error_message: '', answer_questionaire_success_message: ''}
        default: 
            return state
    }
}
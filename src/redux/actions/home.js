export const GET_DAILY_AFFIRMATION = '[app] get daily affirmation'
export const GET_DAILY_AFFIRMATION_LOADED = '[app] get daily affirmation loaded'
export const GET_DAILY_AFFIRMATION_SUCCESS = '[app] get daily affirmation success'
export const GET_DAILY_AFFIRMATION_FAILED = '[app] get daily affirmation failed'
export const DAILY_AFFIMARTION_CLEAR = '[app] daily affirmation clear' 

export const GET_FEATURED_VIDEOS = '[app] get featured videos'
export const GET_FEATURED_VIDEOS_LOADED = '[app] get featured videos loaded'
export const GET_FEATURED_VIDEOS_SUCCESS = '[app] get featured videos success'
export const GET_FEATURED_VIDEOS_FAILED = '[app] get featured videos failed'
export const FEATURED_VIDEOS_CLEAR = '[app] featured videos clear' 

export const GET_FEATURED_ARTICLES = '[app] get featured article'
export const GET_FEATURED_ARTICLES_LOADED = '[app] get featured article loaded'
export const GET_FEATURED_ARTICLES_SUCCESS = '[app] get featured article success'
export const GET_FEATURED_ARTICLES_FAILED = '[app] get featured article failed'
export const FEATURED_ARTICLES_CLEAR = '[app] featured article clear' 

export const GET_QUESTIONAIRE = '[app] get questionaire'
export const GET_QUESTIONAIRE_LOADED = '[app] get questionaire'
export const GET_QUESTIONAIRE_SUCCESS = '[app] get questionaire success'
export const GET_QUESTIONAIRE_FAILED = '[app] get questionaire failed'
export const GET_QUESTIONAIRE_CLEAR = '[app] questionaire clear' 

export const ANSWER_QUESTIONAIRE = '[app] answer questionaire'
export const ANSWER_QUESTIONAIRE_SUCCESS = '[app] answer questionaire success'
export const ANSWER_QUESTIONAIRE_FAILED = '[app] answer questionaire failed'
export const ANSWER_QUESTIONAIRE_CLEAR = '[app] answer questionaire clear' 


export const getDailyAffirmationQuotes = () => ({
    type: GET_DAILY_AFFIRMATION,
})

export const dailyQuotesClear = () => ({
    type: DAILY_AFFIMARTION_CLEAR
})

export const getFeaturedVideos = () => ({
    type: GET_FEATURED_VIDEOS
})

export const featuredVideosClear = () => ({
    type: FEATURED_VIDEOS_CLEAR
})

export const getFeaturedArticles = () => ({
    type: GET_FEATURED_ARTICLES
})

export const featuredArticlesClear = () => ({
    type: FEATURED_ARTICLES_CLEAR
})

export const getQuestionaire = (params) => ({
    type: GET_QUESTIONAIRE,
    payload: params 
})

export const clearQuestionaire = () => ({
    type: GET_QUESTIONAIRE_CLEAR
})

export const questionaireLoaded = (params) => ({
    type: GET_QUESTIONAIRE_LOADED,
    payload: params 
})

export const videosLoaded = (params) => ({
    type: GET_FEATURED_VIDEOS_LOADED,
    payload: params 
})

export const articlesLoaded = (params) => ({
    type: GET_FEATURED_ARTICLES_LOADED,
    payload: params 
})

export const quotesLoaded = (params) => ({
    type: GET_DAILY_AFFIRMATION_LOADED,
    payload: params 
})

export const answerQuestionaire = (body, params) => ({
    type: ANSWER_QUESTIONAIRE,
    payload: {
        body: body,
        params: params
    },
})

export const clearAnswerQuestionaire = () => ({
    type: ANSWER_QUESTIONAIRE_CLEAR,
})
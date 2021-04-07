export const GET_TOPICS = '[app] get topics'
export const GET_TOPICS_LOADED = '[app] get topics loaded'
export const GET_TOPICS_SUCCESS = '[app] get topics success'
export const GET_TOPICS_FAILED = '[app] get topics failed'
export const TOPICS_CLEAR = '[app] topics clear' 

export const GET_VIDEOS = '[app] get videos'
export const GET_VIDEOS_LOADED = '[app] get videos loaded'
export const GET_VIDEOS_SUCCESS = '[app] get videos success'
export const GET_VIDEOS_FAILED = '[app] get videos failed'
export const VIDEOS_CLEAR = '[app] videos clear' 

export const GET_ARTICLES = '[app] get article'
export const GET_ARTICLES_LOADED = '[app] get article loaded'
export const GET_ARTICLES_SUCCESS = '[app] get article success'
export const GET_ARTICLES_FAILED = '[app] get article failed'
export const ARTICLES_CLEAR = '[app] article clear' 



export const getTopics = () => ({
    type: GET_TOPICS,
})

export const topicsClear = () => ({
    type: TOPICS_CLEAR
})

export const getVideos = (params) => ({
    type: GET_VIDEOS,
    payload: params  
})

export const videosClear = () => ({
    type: VIDEOS_CLEAR
})

export const getArticles = (params) => ({
    type: GET_ARTICLES,
    payload: params
})

export const articlesClear = () => ({
    type: ARTICLES_CLEAR
})

export const topicsLoaded = (params) => ({
    type: GET_TOPICS_LOADED,
    payload: params
})

export const videosLoaded = (params) => ({
    type: GET_VIDEOS_LOADED,
    payload: params
})

export const articlesLoaded = (params) => ({
    type: GET_ARTICLES_LOADED,
    payload: params
})


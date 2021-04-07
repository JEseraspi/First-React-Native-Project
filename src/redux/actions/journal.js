export const GET_JOURNAL_QUESTIONS = '[app] get journal questions'
export const GET_JOURNAL_QUESTIONS_SUCCESS = '[app] get journal questions success'
export const GET_JOURNAL_QUESTIONS_FAILED = '[app] get journal questions failed'

export const GET_JOURNAL_RECORDS = '[app] get journal records'
export const GET_JOURNAL_RECORDS_SUCCESS = '[app] get journal records success'
export const GET_JOURNAL_RECORDS_FAILED = '[app] get journal records failed'

export const SAVE_JOURNAL_RECORDS = '[app] save journal records'
export const SAVE_JOURNAL_RECORDS_SUCCESS = '[app] save journal records success'
export const SAVE_JOURNAL_RECORDS_FAILED = '[app] save journal records failed'

export const JOURNAL_CLEAR = '[app] journal clear'

export const getJournalQuestions = (day) => ({
    type: GET_JOURNAL_QUESTIONS,
    payload: day
})

export const getJournalRecords = (id) => ({
    type: GET_JOURNAL_RECORDS,
    payload: id
})

export const saveJournalRecords = (id) => ({
    type: SAVE_JOURNAL_RECORDS,
    payload: id
})

export const journalClear = () => ({
    type: JOURNAL_CLEAR
})


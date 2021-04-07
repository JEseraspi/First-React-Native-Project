// Action imports
import {
    GET_JOURNAL_QUESTIONS,
    GET_JOURNAL_QUESTIONS_FAILED,
    GET_JOURNAL_QUESTIONS_SUCCESS,
    GET_JOURNAL_RECORDS,
    GET_JOURNAL_RECORDS_FAILED,
    GET_JOURNAL_RECORDS_SUCCESS,
    SAVE_JOURNAL_RECORDS,
    SAVE_JOURNAL_RECORDS_FAILED,
    SAVE_JOURNAL_RECORDS_SUCCESS
} from '../actions/journal'
import { callWebService } from '../actions/web_service'

export const getJournalQuestions = ({ dispatch }) => next => action => {

    const bodyparams = action.payload

    next(action)
    if (action.type === GET_JOURNAL_QUESTIONS) {
        dispatch(callWebService(
            'GET',
            `journal/question/${bodyparams}`,
            null,
            null,
            GET_JOURNAL_QUESTIONS_SUCCESS,
            GET_JOURNAL_QUESTIONS_FAILED
        ))
    }
}

export const getJournalRecords = ({ dispatch }) => next => action => {

    const id = action.payload

    next(action)
    if (action.type === GET_JOURNAL_RECORDS) {
        dispatch(callWebService(
            'GET',
            `journal/${id}`,
            null,
            null,
            GET_JOURNAL_RECORDS_SUCCESS,
            GET_JOURNAL_RECORDS_FAILED
        ))
    }
}

export const saveJournalRecords = ({ dispatch }) => next => action => {

    const id = action.payload

    next(action)
    if (action.type === SAVE_JOURNAL_RECORDS) {
        dispatch(callWebService(
            'POST',
            `journal/${id}`,
            null,
            null,
            SAVE_JOURNAL_RECORDS_SUCCESS,
            SAVE_JOURNAL_RECORDS_FAILED
        ))
    }
}



export const journalMiddleware = [getJournalQuestions, getJournalRecords, saveJournalRecords]
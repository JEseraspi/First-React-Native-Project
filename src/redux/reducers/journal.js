import { 
    JOURNAL_CLEAR, 
    GET_JOURNAL_QUESTIONS_SUCCESS, 
    GET_JOURNAL_QUESTIONS_FAILED,
    GET_JOURNAL_RECORDS_FAILED,
    GET_JOURNAL_RECORDS_SUCCESS,
    SAVE_JOURNAL_RECORDS_FAILED,
    SAVE_JOURNAL_RECORDS_SUCCESS 
} from '../actions/journal'

const initialState = {
    journal_questions: [],
    journal_records: [],
    get_records_success_message: "",
    get_records_error_message: "",
    save_records_error_message: "",
    save_records_success_message: "",
    get_success_message: "",
    get_error_message: "",
}

export const journalReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_JOURNAL_QUESTIONS_SUCCESS: 
            return {...state, journal_questions: action.payload, get_success_message: 'get journal question success'}
        case GET_JOURNAL_QUESTIONS_FAILED:
            return {...state, get_error_message: action.payload.message}
        case GET_JOURNAL_RECORDS_SUCCESS: 
            return {...state, journal_records: action.payload, get_records_success_message: 'get journal records success'}
        case GET_JOURNAL_RECORDS_FAILED:
            return {...state, get_records_error_message: action.payload.message}
        case SAVE_JOURNAL_RECORDS_SUCCESS: 
            return {...state, save_records_success_message: 'save journal records success'}
        case SAVE_JOURNAL_RECORDS_FAILED:
            return {...state, save_records_error_message: action.payload.message}
        case JOURNAL_CLEAR: 
            return {
                ...state, 
                get_error_message: '', 
                get_success_message: '',
                save_records_success_message: '',
                save_records_error_message: '',
                get_records_success_message: '',
                get_records_error_message: '',
            }
        default: 
            return state
    }
}
export const SEND_TASK = '[app] send task'
export const SEND_TASK_SUCCESS = '[app] send task success'
export const SEND_TASK_FAILED = '[app] send task failed'

export const sendTask = (data) => ({
    type: SEND_TASK,
    payload: data
}) 


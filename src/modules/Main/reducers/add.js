import {constants} from '../index'
import {getProp} from '../../../helpers'


export const initialState = {
    statuses: {
        isStarted: false,
        isPending: false,
        isFinished: false,
        isFailed: false,
        isSucceed: false
    },
    error: {
        message: ''
    }
}

const reducer =
    (state = initialState, action) => {
        switch (action.type) {
            case constants.ADD_REQUESTED:
                return {
                    ...initialState,
                    statuses: {
                        ...state.statuses,
                        isStarted: true,
                        isPending: true,
                    },
                }
            case constants.ADD_SUCCEEDED:
                return {
                    ...state,
                    statuses: {
                        isStarted: false,
                        isPending: false,
                        isFinished: true,
                        isFailed: false,
                        isSucceed: true
                    },
                }
            case constants.ADD_FAILED:
                return {
                    ...initialState,
                    statuses: {
                        isStarted: false,
                        isPending: false,
                        isFinished: true,
                        isFailed: true,
                        isSucceed: false
                    },
                    error: {
                        message: getProp(() => action.payload.message, '')
                    }
                }

            default:
                return state
        }
    }

export default reducer

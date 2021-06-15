import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
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
    },
    data: []
}

const reducer =
    (state = initialState, action) => {
        switch (action.type) {
            case constants.LIST_REQUESTED:
                return {
                    ...state,
                    statuses: {
                        ...state.statuses,
                        isStarted: true,
                        isPending: true,
                    },
                }
            case constants.LIST_SUCCEEDED:
                return {
                    ...state,
                    statuses: {
                        isStarted: false,
                        isPending: false,
                        isFinished: true,
                        isSucceed: true
                    },
                    data: getProp(() => action.payload.response.data, [])
                }
            case constants.LIST_SUCCEEDED_2:
                return {
                    ...state,
                    statuses: {
                        isStarted: false,
                        isPending: false,
                        isFinished: true,
                        isSucceed: true
                    },
                    data: [
                        ...state.data,
                        ...getProp(() => action.payload.response.data, [])
                    ]
                }
            case constants.LIST_FAILED:
                return {
                    ...initialState,
                    statuses: {
                        isPending: false,
                        isFinished: true,
                        isFailed: true,
                        isSucceed: false
                    },
                    error: {
                        message: getProp(() => action.payload.message, '')
                    }
                }
            case constants.LIST_CHANGE_STATUS:
                return {
                    ...state,
                    data: state.data.map((d) => {
                        if(d.id === action.payload.id) {
                            return {
                                ...d,
                                status: action.payload.status
                            }
                        }
                        return d
                    })
                }
            default:
                return state
        }
    }
// const conf = {
//     key: 'list.of.documents',
//     storage
// }
//
// const persistentReducer = persistReducer(conf, reducer)

export default reducer

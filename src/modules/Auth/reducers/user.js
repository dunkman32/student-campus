import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {ADD, REMOVE} from '../constants'
export const initialState = {
    user: null
}

const reducer =
    (state = initialState, action) => {
        switch (action.type) {
            case ADD:
                return {user: action.payload.user}
            case REMOVE:
                return {user: null}
            default:
                return state
        }
    }
const conf = {
    key: 'user',
    storage
}

const persistentReducer = persistReducer(conf, reducer)

export default persistentReducer

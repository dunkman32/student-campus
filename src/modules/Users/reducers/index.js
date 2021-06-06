import { combineReducers } from 'redux'
import list from './list'
import user from './user'

const reducers = {
  list,
  user
}

const rootReducer = combineReducers(reducers)
export default rootReducer

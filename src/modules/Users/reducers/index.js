import { combineReducers } from 'redux'
import list from './list'

const reducers = {
  list
}

const rootReducer = combineReducers(reducers)
export default rootReducer

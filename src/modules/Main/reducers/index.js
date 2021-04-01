import { combineReducers } from 'redux'
import list from './list'
import add from './add'

const reducers = {
  list,
  add
}

const rootReducer = combineReducers(reducers)
export default rootReducer

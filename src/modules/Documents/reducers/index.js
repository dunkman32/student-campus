import { combineReducers } from 'redux'
import list from './list'
import listById from './listById'

const reducers = {
  list,
  listById
}

const rootReducer = combineReducers(reducers)
export default rootReducer

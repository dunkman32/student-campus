import { combineReducers } from 'redux'
import { helpers as storeHelpers } from '../config'
import { getRequireContextModules } from './helpers'
import { firebaseReducer } from 'react-redux-firebase'


const releaseBasedReducers = storeHelpers
  .getAllModuleReducers(getRequireContextModules())

export default combineReducers({
  firebase: firebaseReducer,
  ...releaseBasedReducers
})

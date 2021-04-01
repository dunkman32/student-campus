import { store as baseStore } from '../config'
import rootReducer from './reducers'
import sagas from './sagas'

export const { store, persistor } = baseStore(rootReducer, sagas, {
  reduxDevTools: process.env.REACT_APP_REDUX_DEVTOOLS
})

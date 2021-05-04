import * as actions from './actions'
import * as constants from './constants'
import reducer from './reducers'
import saga from './sagas'
import * as selectors from './selectors'
const moduleName = 'Users'

export {
  moduleName,
  reducer,
  actions,
  selectors,
  constants,
  saga
}

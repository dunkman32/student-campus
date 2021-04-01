import { all, spawn, call } from 'redux-saga/effects'
import { helpers as storeHelpers } from '../config'
import { getRequireContextModules } from './helpers'
function * rootSaga () {
  yield all(storeHelpers.getAllModuleSagas(getRequireContextModules()))
  const sagas = storeHelpers
    .getAllModuleSagas(getRequireContextModules())
  /*
   * Keeping the root alive
   * ref: https://redux-saga.js.org/docs/advanced/RootSaga.html
   */
  const decentralizedSagas = sagas.map((saga) =>
    spawn(function * () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e, 'Saga crash detected')
        }
      }
    })
  )
  yield all(decentralizedSagas)
}
export default rootSaga

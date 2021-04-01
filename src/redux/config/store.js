import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'

// eslint-disable-next-line import/no-anonymous-default-export
export default (rootReducer, mySaga, { reduxDevTools = false } = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: []
    }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const composeEnhancers =
        (reduxDevTools && typeof window !== 'undefined' &&
            (
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
                window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                    trace: true
                })
            )
        ) || compose

    const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
    const persistor = persistStore(store)
    sagaMiddleware.run(mySaga)
    return {
        store,
        persistor
    }
}

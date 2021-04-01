import React from 'react';
import {Provider} from 'react-redux'
import './App.css';
import Components from './components'
import {persistor, store} from './redux/store'
import {PersistGate as BasePersistGate} from 'redux-persist/integration/react'
import 'antd/dist/antd.css';

const App = () => {
    return (
        <Provider store={store}>
            <BasePersistGate persistor={persistor}>
                <Components />
            </BasePersistGate>
        </Provider>
    );
}

export default App;

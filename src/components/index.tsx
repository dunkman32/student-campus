import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {HashRouter as Router, Route, Switch,} from 'react-router-dom';
import Main from '../components/main'
import Chat from '../components/chat'
import SignIn from '../components/SignIn'
import {auth} from '../adapters/helpers'
import {actions, selectors} from '../modules/Auth';

const Components = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectors.selectUser)
    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            dispatch(actions.user.add(user))
        });
    }, [dispatch]);

    return user ? (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Main/>
                    </Route>
                    <Route path="/chat" exact>
                        <Chat/>
                    </Route>
                </Switch>
            </Router>
        ) :
        (<SignIn/>)
}

export default Components;

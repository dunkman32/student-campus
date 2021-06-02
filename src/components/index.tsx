import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import Main from '../components/main'
import Chat from '../components/chat'
import Documents from '../components/documents'
import SignIn from '../components/SignIn'
import {auth} from '../adapters/helpers'
import {readUserById} from '../adapters/users'
import {actions, selectors} from '../modules/Auth';

const Components = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectors.selectUser)
    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            if(user) {
                const tmpUser = {
                    ...user.providerData[0],
                    id: user.uid
                }
                readUserById(user.uid).then((r) => {
                    dispatch(actions.user.add({
                        ...tmpUser,
                        ...r.data()
                    }))
                }).catch((e) => console.log(e))
            }
        });
    }, [dispatch]);


    return user ? (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Main/>
                    </Route>
                    <Route path="/documents" exact>
                        <Documents/>
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

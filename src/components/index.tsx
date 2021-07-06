import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch,} from 'react-router-dom';
import Main from '../components/main'
import Chat from '../components/chat'
import Documents from '../components/documents'
import ListById from '../components/documents/listById'
import SignIn from '../components/SignIn'
import {auth} from '../adapters/helpers'
import {readUserById} from '../adapters/users'
import {actions, selectors} from '../modules/Auth';
import Header from "./Header";
import Footer from "./Footer";
import User from "./user";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const Components = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectors.selectUser)
    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            if (user) {
                const tmpUser = {
                    ...user.providerData[0],
                    id: user.uid
                }
                readUserById(user.uid).then((r) => {
                    const usrFromBase: any = r.data()
                    if (usrFromBase?.role !== 'student') {
                        dispatch(actions.user.add({
                            ...tmpUser,
                            ...usrFromBase
                        }))
                    }
                }).catch((e) => console.log(e))
            }
        });
    }, [dispatch]);




    return user && user.uid ? (
            <Router>
                <Div>
                    <div>
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={Main}/>
                            <Route path="/user/:id" exact component={User}/>
                            <Route path="/documents" exact component={Documents}/>
                            <Route path="/documents/:id" exact component={ListById}/>
                            <Route path="/chat" exact component={Chat}/>
                        </Switch>
                    </div>
                    <Footer/>
                </Div>
            </Router>
        ) :
        (<SignIn/>)
}

export default Components;

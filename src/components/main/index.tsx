import React, {useEffect} from 'react';
import '../../App.css';
import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../modules/Main'
import {selectors as authSelectors} from '../../modules/Auth'
import styled from "styled-components";
import {Typography} from "antd";
import Header from '../Header'

import Table from '../students/table'
import AddModal from "../students/add";

const {Title} = Typography;

const HeadDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  font-style: italic;
`;


const Index = () => {
    const dispatch = useDispatch()
    const user = useSelector(authSelectors.selectUser)

    useEffect(() => {
        dispatch(actions.get.request())
    }, [dispatch]);


    return (
        <div className="App">
            <Header/>
            <StyledTitle type="secondary" level={4}>Welcome back {user.name} your role
                is {user.role || 'admin'}</StyledTitle>
            <HeadDiv>
                <AddModal/>
            </HeadDiv>
            <hr/>
            <Table/>
        </div>
    );
}

export default Index;

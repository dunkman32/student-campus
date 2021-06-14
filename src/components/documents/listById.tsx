import React, {useCallback, useEffect, useState} from 'react';
import '../../App.css';
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actions, selectors} from "../../modules/Documents";
import TableComponent from './table';
import User from './user';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  box-shadow: -1px -1px 6px 1px rgba(0,0,0,0.1);
  width: 96%;
  position: relative;
  margin: 10rem auto 0;
  background-color: #282c34;
  padding: 5rem;
  border-radius: 20px;
`

enum Status {
    Pending= 'Pending',
    Approved= 'Approved',
    Rejected= 'Rejected',
}


interface ParamsType {
    id: string
}

const Index = () => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState('')

    const {id}: ParamsType = useParams()
    const rows = useSelector(selectors.selectListOfDocumentsById)

    const callForData = useCallback(() => {
        dispatch(actions.listById.request(id, status))
    }, [dispatch, id, status])

    const changeStatus = useCallback((id, status) => {
        dispatch(actions.listById.change(id, status))
    }, [dispatch, id, status])

    useEffect(() => {
        callForData()
    }, [dispatch, id, status])

    return (
        <Container>
                <User id={id}/>
                <Tabs
                    tabBarStyle={{
                        color: '#fefae0'
                    }}
                    onChange={setStatus}>
                    <TabPane tab={'ყველა'} key={''} />
                    <TabPane tab={'განუხილავი'} key={Status.Pending} />
                    <TabPane tab={'დადასტურებული'} key={Status.Approved}/>
                    <TabPane tab={'უარყოფილი'} key={Status.Rejected}/>
                </Tabs>
                {
                    rows && <TableComponent data={rows} changeStatus={changeStatus}/>
                }
            </Container>
    );
}

export default Index;

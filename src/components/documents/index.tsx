import React, {useEffect, useState} from 'react';
import '../../App.css';
import styled from "styled-components";
import TableComponent from './table'
import {Tabs} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {actions, selectors} from "../../modules/Documents";

const { TabPane } = Tabs;

const Container = styled.div`
  box-shadow: -1px -1px 6px 1px rgba(0,0,0,0.1);
  width: 100%;
  position: relative;
  background-color: #282c34;
  padding: 2rem 5rem;
`

enum Status {
    Pending= 'Pending',
    Approved= 'Approved',
    Rejected= 'Rejected',
}

const Index = () => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState('')
    const rows = useSelector(selectors.selectListOfDocuments)
    useEffect(() => {
        dispatch(actions.list.request( status))
    }, [dispatch, status])
    return (
        <Container>
            <Tabs
                tabBarStyle={{
                    color: '#fefae0'
                }}
                onChange={setStatus}>
                <TabPane tab={'All'} key={''} />
                <TabPane tab={Status.Pending} key={Status.Pending} />
                <TabPane tab={Status.Approved} key={Status.Approved}/>
                <TabPane tab={Status.Rejected} key={Status.Rejected}/>
            </Tabs>
            {
                rows && <TableComponent data={rows} withLink/>
            }
        </Container>
    );
}

export default Index;

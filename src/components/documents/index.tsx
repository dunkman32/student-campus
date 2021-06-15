import React, {useCallback, useEffect, useMemo, useState} from 'react';
import '../../App.css';
import styled from "styled-components";
import TableComponent from './table'
import {Button, Tabs} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {actions, selectors} from "../../modules/Documents";
import qs from "qs";
import {
    BrowserRouter as Router,
    useHistory,
    useLocation
} from "react-router-dom";
import {stat} from 'node:fs';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {totalSize} from "../../adapters/users";

const {TabPane} = Tabs;

const Container = styled.div`
  box-shadow: -1px -1px 6px 1px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  background-color: #282c34;
  padding: 2rem 5rem;
`

enum Status {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
}


const Centered = styled.div`
  width: 80%;
  display: flex;
  margin: auto;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
`;

const Index = () => {
    const {search} = useLocation()
    const history = useHistory()
    const {status} = qs.parse(search, {ignoreQueryPrefix: true})
    const dispatch = useDispatch()
    const rows = useSelector(selectors.selectListOfDocuments)

    const setStatus = (status: string) => {
        if (status) {
            history.push(`/documents?status=${status}`)
        } else {
            history.push('/documents')
        }
    }

    const activeKey: string = useMemo(() => status?.toString() || '', [status])


    const callMore = useCallback((id: string) => () => {
        dispatch(actions.list.request(status, id))
    }, [status])


    const callForData = useCallback(() => {
        dispatch(actions.list.request(status))
    }, [status])

    const changeStatus = useCallback((id, status) => {
        dispatch(actions.list.change(id, status))
    }, [status])

    useEffect(() => {
        callForData()
    }, [dispatch, status])

    return (
        <>
        <Container>
            <Tabs
                tabBarStyle={{
                    color: '#fefae0'
                }}
                defaultActiveKey={activeKey}
                onChange={setStatus}>
                <TabPane tab={'ყველა'} key={''} />
                <TabPane tab={'განუხილავი'} key={Status.Pending} />
                <TabPane tab={'დადასტურებული'} key={Status.Approved}/>
                <TabPane tab={'უარყოფილი'} key={Status.Rejected}/>
            </Tabs>
            {
                rows && <TableComponent data={rows} changeStatus={changeStatus} withLink/>
            }
        </Container>
        <Centered>
                <Button onClick={callMore(rows[rows.length - 1])}>
                    მეტი
                </Button>
        </Centered>
        </>
    );
}

export default Index;

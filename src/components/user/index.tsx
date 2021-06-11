import React, {useEffect, useMemo, useState} from 'react';
import '../../App.css';
import {Tabs} from "antd";
import User from "./user";
import {useDispatch, useSelector} from "react-redux";
import {actions, selectors} from "../../modules/Documents";
import qs from "qs";
import {
    useHistory,
    useLocation, useParams
} from "react-router-dom";
import {
    StyledHeader, Container, Docs, Image, ImageWrapper,
    ImageName
} from './styles'
import {formatDate} from '../../helpers'
const {TabPane} = Tabs;


enum Status {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
}

interface ParamsType {
    id: string
}

const Index = () => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState('')

    const {id}: ParamsType = useParams()
    const rows = useSelector(selectors.selectListOfDocumentsById)
    useEffect(() => {
        dispatch(actions.listById.request(id, status))
    }, [dispatch, id, status])
    const activeKey: string = useMemo(() => status?.toString() || '', [status])

    useEffect(() => {
        dispatch(actions.list.request(status))
    }, [dispatch, status])
    return (
        <>
            <StyledHeader/>
            <Container>
                <div>
                    <User id={id}/>
                </div>
                <div>
                    <Tabs
                        tabBarStyle={{
                            color: '#fefae0'
                        }}
                        defaultActiveKey={activeKey}
                        onChange={setStatus}>
                        <TabPane tab={'All'} key={''}/>
                        <TabPane tab={Status.Pending} key={Status.Pending}/>
                        <TabPane tab={Status.Approved} key={Status.Approved}/>
                        <TabPane tab={Status.Rejected} key={Status.Rejected}/>
                    </Tabs>
                    <Docs>
                        {
                            rows && rows.map((o: any) => {
                                return (
                                    <ImageWrapper>
                                        <ImageName>{formatDate(o.createdAt, 'yyyy.MM.dd')}</ImageName>
                                        <Image src={o.file} alt={'file'}/>
                                    </ImageWrapper>
                                )
                            })
                        }
                    </Docs>
                </div>
            </Container>
        </>
    );
}

export default Index;

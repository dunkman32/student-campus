import React, {useCallback, useEffect, useRef} from 'react';
import '../../App.css';
import {useSelector} from 'react-redux'
import {useMessagesStream, sendMessage} from '../../adapters/chat'
import styled from "styled-components";
import {Input, message as notification} from "antd";
import TableComponent from './table'
import {selectors as authSelectors} from '../../modules/Auth'

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`

const InputDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Index = () => {
    const user = useSelector(authSelectors.selectUser)
    const rows = useMessagesStream()
    const forScroll = useRef<HTMLDivElement>(null)
    const addFilm = useCallback((message) => {
        sendMessage({
            uid: user.uid,
            text: message,
            photo: user.photoURL,
            createdAt: new Date().getTime(),
            user: user.displayName,
        }).then((r) => {
            notification.success('successfully sent!')
        }).catch((e) => {
            notification.error('something went wrong, for info ask customer support!')
        })

    }, [user.displayName, user.photoURL, user.uid])

    useEffect(() => {
        console.log('lolo');
        // @ts-ignore
        forScroll.current.focus()
    }, [rows])

    return (
        <Container>
            {
                rows && <TableComponent data={rows}/>
            }
            <div ref={forScroll}/>
            <InputDiv>
                <Input.Search
                    allowClear
                    placeholder="add message"
                    enterButton="Send"
                    onSearch={addFilm}
                />
            </InputDiv>
        </Container>
    );
}

export default Index;

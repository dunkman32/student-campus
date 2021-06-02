import React from 'react';
import '../../App.css';
import {useMessagesStream} from '../../adapters/documents'
import styled from "styled-components";
import TableComponent from './table'

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`

const Index = () => {
    const rows = useMessagesStream()
    return (
        <Container>
            {
                rows && <TableComponent data={rows} />
            }
        </Container>
    );
}

export default Index;

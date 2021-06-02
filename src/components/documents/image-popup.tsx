import React from 'react';
import {Popover} from 'antd';
import styled from "styled-components";

interface Row {
    userId: string,
    username: string,
    file: any,
    desc: string,
    createdAt: number
}

interface T {
    row: Row,
    children: React.ReactNode
}
const Img = styled.img`
  width: 400px;
  cursor: pointer;
`

const ImagePopup = ({children, row}: T) => {
    return (
        <Popover
            title={row.username}
            content={<Img src={row.file} alt="student"/>}
        >
            {children}
        </Popover>
    );
};

export default ImagePopup

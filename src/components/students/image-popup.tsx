import React from 'react';
import {Popover} from 'antd';
import styled from "styled-components";

interface User {
    birth: string,
    campus: string,
    createdAt: number,
    email: string,
    idNumber: string,
    img: string,
    name: string,
    no: number,
    role: string,
    uid: string,
}

interface T {
    row: User,
    children: React.ReactNode
}
const Img = styled.img`
  width: 400px;
  cursor: pointer;
`

const ImagePopup = ({children, row}: T) => {
    return (
        <Popover
            title={row.name}
            content={<Img src={row.img} alt="student"/>}
            >
            {children}
        </Popover>
    );
};

export default ImagePopup

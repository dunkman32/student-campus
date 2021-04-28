import React, {useState} from "react";
import styled from "styled-components";
import {Menu} from 'antd';
import {MailOutlined, AppstoreOutlined} from '@ant-design/icons';
import SignOut from '../SignOut';


const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #001529;
  padding: 0 5rem
`;

const Header = () => {
    const [current, setCurrent] = useState('mail')

    const handleClick = (e: any) => {
        setCurrent(e.key)
    }

    return (
        <MenuContainer>
            <Menu theme={'dark'} onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="mail" icon={<MailOutlined/>}>
                        Navigation One
                    </Menu.Item>
                    <Menu.Item key="app" icon={<AppstoreOutlined/>}>
                        Navigation Two
                    </Menu.Item>
                    <Menu.Item key="alipay">
                        Navigation Four - Link
                    </Menu.Item>
            </Menu>
            <SignOut />
        </MenuContainer>
    )
}

export default Header

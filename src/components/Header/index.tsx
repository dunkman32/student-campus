import React, {useState} from "react";
import {Menu} from 'antd';
import {MailOutlined, AppstoreOutlined} from '@ant-design/icons';

const Header = () => {
    const [current, setCurrent] = useState('mail')

    const handleClick = (e: any) => {
        setCurrent(e.key)
    }

    return (
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
    )
}

export default Header

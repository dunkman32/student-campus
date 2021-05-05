import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {Menu, Space, Input} from 'antd';
import {MailOutlined, AppstoreOutlined} from '@ant-design/icons';
import SignOut from '../SignOut';
import AddModal from "../students/add";
import {actions} from '../../modules/Users'
import {useDispatch} from "react-redux";
const { Search } = Input;

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #001529;
  padding: 0 5rem
`;

const StyledSearch = styled(Search)`
  min-width: 200px;
  input:focus {
    min-width: 500px;
  }
`

const Header = () => {
    const [current, setCurrent] = useState('mail')
    const dispatch = useDispatch()
    const handleClick = (e: any) => {
        setCurrent(e.key)
    }

    const onSearch = (value: string) => {
        console.log(value)
        dispatch(actions.get.request({
            limit: 25,
            filterStr: value
        }))
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
            <div>
                <Space>
                    <StyledSearch placeholder="იპოვე სტუდენტი (სახელით, ელ. ფოსტით, კორპუსით ან პირადი ნომრით)" onSearch={onSearch} enterButton />
                    <AddModal/>
                    <SignOut />
                </Space>
            </div>
        </MenuContainer>
    )
}

export default Header

import {auth} from "../../adapters/helpers";
import React from "react";
import {Button, Tooltip} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {actions} from '../../modules/Auth';
import styled from "styled-components";

const StyledButton = styled(Button)`
  padding: 0 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const SignOut = () => {
    const dispatch = useDispatch()

    const signOut = () => {
        auth.signOut().then(() =>
            dispatch(actions.user.remove())
        ).catch((e) => console.log(e))
    }
    return (
        <Tooltip title="გამოსვლა">
            <LogoutOutlined onClick={signOut} style={{fontSize: '1.25rem', color: '#fff'}}/>
        </Tooltip>
    )
}

export default SignOut

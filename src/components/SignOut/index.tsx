import {auth} from "../../adapters/helpers";
import React from "react";
import {Button, Tooltip} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {actions} from '../../modules/Auth';

const SignOut = () => {
    const dispatch = useDispatch()

    const signOut = () => {
        auth.signOut().then(() =>
            dispatch(actions.user.remove())
        ).catch((e) => console.log(e))
    }
    return (
        <Tooltip title="Sign Out">
            <Button onClick={signOut} icon={<LogoutOutlined/>}/>
        </Tooltip>
    )
}

export default SignOut

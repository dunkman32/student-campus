import React from "react";
import {Form} from 'antd';
import {auth} from '../../adapters/helpers';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import Orange from '../../static/images/circleOrange.svg'
import Green from '../../static/images/circleGreen.svg'
import Blue from '../../static/images/circleBlue.svg'
import {
    CircleBlueDiv,
    CircleGreenDiv,
    CircleOrangeDiv,
    Div,
    StyledButton,
    StyledDiv,
    StyledForm,
    StyledInput
} from './styles'

const SignIn = () => {
    const onFinish = async (values: any) => {
        await auth.signInWithEmailAndPassword(values.username, values.password)
    };
    return (
        <StyledDiv>
            <Div>
                <StyledForm
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <StyledInput
                            type={'email'}
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="E-mail"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <StyledInput
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <StyledButton
                            block
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            Log in
                        </StyledButton>
                    </Form.Item>
                </StyledForm>
                <CircleOrangeDiv>
                    <img src={Orange} alt={'orange'}/>
                </CircleOrangeDiv>
                <CircleGreenDiv>
                    <img src={Green} alt={'blue'}/>
                </CircleGreenDiv>
                <CircleBlueDiv>
                    <img src={Blue} alt={'green'}/>
                </CircleBlueDiv>
            </Div>
        </StyledDiv>
    )
}

export default SignIn

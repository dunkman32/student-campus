import React, {useCallback, useState} from 'react';
import {Button, DatePicker, Form, Input, InputNumber, Modal, Select,} from 'antd';
import {UserAddOutlined} from '@ant-design/icons'
import {addStudent} from '../../adapters/users';


const AddModal = () => {
    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setVisible(false);
        addFilm(values)
    };

    const submit = () => {
        form
            .validateFields()
            .then(values => {
                onCreate(values)
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            })
    }
    const addFilm = useCallback((o) => {
        const student = {
            ...o,
            birth: o.birth.toString(),
            createdAt: new Date().getTime()
        }
        addStudent(student).then(() => {
            console.log('added')
        }).catch((e) => {
            console.log(e, 'denied')
        })
    }, [])

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                <UserAddOutlined/>
            </Button>
            <Modal
                title="Add Student"
                centered
                visible={visible}
                onOk={submit}
                onCancel={() => setVisible(false)}
                width={1000}>
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                >
                    <Form.Item name={'name'} label="სახელი, გვარი">
                        <Input />
                    </Form.Item>
                    <Form.Item name={'ID'} label="პირადი ნომერი">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'no'} label="ბინა">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name={'campus'} label="საცხოვრებელი კორპ.">
                        <Select>
                            <Select.Option value="პირველი">პირველი</Select.Option>
                            <Select.Option value="მეორე">მეორე</Select.Option>
                            <Select.Option value="ლისი">ლისი</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'birth'} label="დაბადებული">
                        <DatePicker/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddModal
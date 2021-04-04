import React, {useState} from 'react';
import {
    Modal,
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
} from 'antd';
import {UserAddOutlined} from '@ant-design/icons'

type SizeType = Parameters<typeof Form>[0]['size'];

const AddModal = () => {
    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setVisible(false);
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
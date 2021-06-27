import {Fragment, useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {addComment} from '../../../adapters/comments';
import {handleRemove} from "../../../adapters/documents";

const {TextArea} = Input;

const AddComment = ({documentId, user, open, close}: any) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onCreate = (values: any) => {
        if (values.comment) {
            setConfirmLoading(true);
            addComment(values.comment).then(() => {
                handleRemove(documentId)
                    .then(() => {})
                    .catch(() => {})
            }).catch(() => {
            })
        } else return null;
    };

    const onSubmit = () => {
        form
            .validateFields()
            .then(values => {
                onCreate(values)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            })
    };

    return (
            <Modal
                okText={'ატვირთვა'}
                cancelText={'დახურვა'}
                title="დოკუმენტის ატვირვა"
                centered
                visible={open}
                onOk={onSubmit}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    close();
                    form.resetFields()
                }}
                width={700}>
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                >
                    <Form.Item
                        name={'comment'}
                        label="კომენტარი"
                        rules={[{required: true, message: 'შეიყვანეთ კომენტარი'}]}
                    >
                        <TextArea showCount maxLength={256} placeholder={'შეიყვანეთ კომენტარი...'}/>
                    </Form.Item>
                </Form>
            </Modal>
    );
};

export default AddComment;

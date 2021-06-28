import {useState} from 'react';
import {Form, Input, message as notification, Modal} from 'antd';
import {addComment} from '../../../adapters/comments';
import {handleRemove} from "../../../adapters/documents";

const {TextArea} = Input;

const AddComment = ({document, open, close, changeStatus}: any) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const onCreate = ({comment}: any) => {
        if (comment) {
            setConfirmLoading(true);
            addComment({
                comment,
                file: document.file,
                userId: document.userId,
                documentId: document.id
            }).then(() => {
                handleRemove(document).then(() => {
                    changeStatus(document.id, 'Rejected')
                    notification.success('დოკუმენტი მოინიშნა გაუქმებულად')
                    close()
                }).catch((e) => {
                    notification.error('დოკუმენტის სტატუსის ცვლილება ვერ მოხერხდა')
                })
            }).catch((e) => {
                notification.error('დოკუმენტის სტატუსის ცვლილება ვერ მოხერხდა')
            }).finally(() => {
                setConfirmLoading(false)
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
            okText={'დოკუმენტის უარყოფა'}
            cancelText={'დახურვა'}
            title="დოკუმენტის უარყოფა"
            centered
            visible={open}
            onOk={onSubmit}
            confirmLoading={confirmLoading}
            onCancel={() => {
                close();
                form.resetFields()
                setConfirmLoading(false)
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

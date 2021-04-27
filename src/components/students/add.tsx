import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, DatePicker, Form, Input, InputNumber, Modal, Select} from 'antd';
import {EditTwoTone, FileAddTwoTone} from '@ant-design/icons'
import {addUserWithEmail, updateStudent} from '../../adapters/users';
import moment from "moment";
import {omit} from 'lodash'

const AddModal = ({ student, callTake }: { student?: any, callTake?: any }) => {
    const [form] = Form.useForm();
    const isEdit = useMemo(() => Boolean(student), [student])
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);

    const onCreate = (values: any) => {
        setVisible(false);
        if (isEdit) {
            callTake()
            update({
                ...student,
                ...values,
            })
        } else {
            add(values)
        }
    };

    useEffect(() => {
        if (form && visible && student) {
            form.setFieldsValue({
                name: student.name,
                idNumber: student.idNumber,
                no: student.no,
                campus: student.campus,
                email: student.email,
                birth: moment(student.birth)
            })
        }
    }, [form, visible, student])

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
    const add = useCallback((o) => {
        const student = {
            ...o,
            file,
            birth: o.birth.toString(),
            createdAt: new Date().getTime()
        }
        addUserWithEmail(student).then((usr) => {
            console.log(usr, 'success');
        }).catch((err)=> console.log(err))
    }, [file])

    const update = useCallback((student) => {
        console.log(student, 'aaaa');
        const omitArr = ['birth', 'createdAt']
        if(!student.file) omitArr.push('file')
        updateStudent(omit(student, omitArr)).then(() => {
            console.log('update')
        }).catch((e) => {
            console.log(e, 'denied')
        })
    }, [])

    const change = (e: any) => {
        const files = e.target.files;
        console.log(files);
        setFile(files[0])
      }

    return (
        <>
            <Button onClick={() => setVisible(true)}>
                {
                    isEdit ? <EditTwoTone twoToneColor="#fadb14" /> : <FileAddTwoTone twoToneColor="#52c41a" />
                }
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
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item name={'email'} label="email">
                        <Input />
                    </Form.Item>
                    <Form.Item name={'name'} label="სახელი, გვარი">
                        <Input />
                    </Form.Item>
                    <Form.Item name={'idNumber'} label="პირადი ნომერი">
                        <Input />
                    </Form.Item>
                    <Form.Item name={'no'} label="ბინა">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={'campus'} label="საცხოვრებელი კორპ.">
                        <Select>
                            <Select.Option value="პირველი">პირველი</Select.Option>
                            <Select.Option value="მეორე">მეორე</Select.Option>
                            <Select.Option value="ლისი">ლისი</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'birth'} label="დაბადებული">
                        <DatePicker disabled={isEdit} />
                    </Form.Item>
                    <Form.Item name={'file'} label="file">
                        <input type='file' onChange={change}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddModal

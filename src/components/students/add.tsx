import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { EditTwoTone, FileAddTwoTone } from '@ant-design/icons'
import { addStudent, updateStudent, addUserWithEmail, uploadFile } from '../../adapters/users';
import moment from "moment";
import { omit } from 'lodash'

const AddModal = ({ student }: { student?: any }) => {
    const [form] = Form.useForm();
    const isEdit = useMemo(() => Boolean(student), [student])
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);

    const onCreate = (values: any) => {
        setVisible(false);
        if (isEdit) {
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
            birth: o.birth.toString(),
            createdAt: new Date().getTime()
        }
        addStudent(student).then(() => {
            return uploadFile(student.idNumber, file).then((r) => {
                console.log(r, 123123123)
            }).catch((e) => console.log(e))
        }).then(() => {
            return addUserWithEmail(student.email, student.idNumber)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                })
                .catch((error) => {
                    console.log(error.message)
                });
        }).catch((e) => {
            console.log(e, 'denied')
        })
    }, [file])

    const update = useCallback((student) => {
        updateStudent(omit(student, ['birth'])).then(() => {
            console.log('update')
        }).catch((e) => {
            console.log(e, 'denied')
        })
    }, [])

    const change = (e: any) => {
        var files = e.target.files;
        console.log(files);
        setFile(files[0])
        // return uploadFile(files[0]).then((r) => {
        //     console.log(r, 123123123)
        // }).catch((e) => console.log(e))
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
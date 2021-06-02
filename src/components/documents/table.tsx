import React from "react";
import {format, isValid} from "date-fns";
import ImagePopup from "./image-popup";
// @ts-ignore
import {Img, StyledTable} from './styles'
import AddModal from "../students/add";
import {Button, Popconfirm} from "antd";
import {DeleteTwoTone, HeartTwoTone} from "@ant-design/icons";
import {
    handleApprove,
    handleRemove
} from '../../adapters/documents'

interface Row {
    userId: string,
    username: string,
    file: any,
    desc: string,
    createdAt: number,
    approved?: boolean
}

const formatDate = (d: number) => {
    const date = new Date(d)
    if (isValid(date)) {
        return format(date, "yyyy.MM.dd 'at' HH:mm:ss")
    }
    return 'undefined'
}


const TableComponent = ({data}: { data: Row[] }) => {
    const columns = [
        {
            title: 'Image',
            dataIndex: 'file',
            key: 'file',
            width: '5%',
            render: (_: any, row: any) => {
                return (
                    <ImagePopup row={row}>
                        <Img src={row.file} alt="document"/>
                    </ImagePopup>
                )
            }
        },
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username',
            width: '15%',
        },
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
            width: '10%',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: '20%',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '10%',
            render: (_: any, row: any) => (
                <span>{formatDate(row.createdAt)}</span>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (_: any, row: any) => (
                <>
                    <Popconfirm key={row.id} title="Sure to approve?"
                                onConfirm={() => handleApprove(row)}>
                        <Button>
                            <HeartTwoTone/>
                        </Button>
                    </Popconfirm>
                    <Popconfirm key={row.id} title="Sure to remove?"
                                onConfirm={() => handleRemove(row)}>
                        <Button>
                            <DeleteTwoTone twoToneColor="#f5222d"/>
                        </Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    return (
        <StyledTable
            rowClassName={(record: any) => record.approved ? '': 'tableRow'}
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    );
}

export default TableComponent

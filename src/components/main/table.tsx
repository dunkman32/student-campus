import React, {useCallback} from "react";
import {Button, Table, Popconfirm} from 'antd';
import {format, isValid} from "date-fns";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {actions} from '../../modules/Main'

const {Column} = Table;

interface DataType {
    addDate: number,
    name: string,
    id: string
}

const formatDate = (d: number) => {
    const date = new Date(d)
    if (isValid(date)) {
        return format(date, "yyyy.MM.dd 'at' HH:mm:ss")
    }
    return 'undefined'
}

const CustomTable = styled(Table)`
  width: 80%;
  margin: 0 auto;
`;

const TableComponent = ({data}: { data: DataType[] }) => {
    const dispatch = useDispatch()

    const handleDelete = useCallback((id: string) => () => {
        dispatch(actions.remove.request(id))
    }, [dispatch])
    const rows = data.map(r => ({
        ...r,
        key: r.id
    }))

    return (
        <CustomTable
            dataSource={rows}
            pagination={{
                current: 1,
                pageSize: 20,
            }}
        >
            <Column title="Date" dataIndex="addDate" key="addDate" render={date => formatDate(date)}/>
            <Column title="Name" dataIndex="name" key="name"/>
            <Column title="Action" dataIndex="action" key="action" render={(_, row: {id: string}) => (
                <Popconfirm title="Sure to delete?" onConfirm={handleDelete(row.id)}>
                    <Button>
                        delete
                    </Button>
                </Popconfirm>
            )
            }/>
        </CustomTable>
    )
}

export default TableComponent

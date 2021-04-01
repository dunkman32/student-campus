import React, {useCallback, useEffect, useRef} from "react";
import {Avatar, Button, List, Popconfirm} from 'antd';
import {format, isValid} from "date-fns";
import styled from "styled-components";
import {database} from '../../adapters/helpers'
import {removeMessage} from '../../adapters/chat'

const db = database.ref("messages");


console.log(database, db);


interface DataType {
    text: string,
    photo: string,
    uid: string,
    createdAt: number,
    displayName: string,
    id: string
}

const formatDate = (d: number) => {
    const date = new Date(d)
    if (isValid(date)) {
        return format(date, "yyyy.MM.dd 'at' HH:mm:ss")
    }
    return 'undefined'
}

const CustomList = styled(List)`
  width: 100%;
  height: 90vh;
  border: 1px dashed grey;
  padding: 1rem 2rem;
  margin:0 auto;
  overflow-y: auto;
`;

const TableComponent = ({data}: { data: DataType[] }) => {
    const handleDelete = useCallback((id: string) => () => {
        return removeMessage(id);
    }, [])

    const rows = data.map(r => ({
        ...r,
        key: r.uid
    }))
    const forScroll = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // @ts-ignore
        forScroll.current.scrollIntoView({behavior: 'smooth'})
    }, [rows])
    // <div ref={forScroll}/>

    return (
        <CustomList
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            footer={<div style={{padding: 0}} ref={forScroll}/>}
            dataSource={rows}
            renderItem={(item: any) => (
                <List.Item
                    actions={[
                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={handleDelete(item.id)}>
                            <Button>
                                delete
                            </Button>
                        </Popconfirm>
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar src={item.photo}/>
                        }
                        title={item.user}
                        description={item.text}
                    />
                </List.Item>
            )}
        />
    );
}

export default TableComponent

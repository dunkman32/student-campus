import React, {useCallback, useEffect, useState} from 'react'
import {Table, Input, Button, Space, Popconfirm, Tag} from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
    DeleteTwoTone,
    RightOutlined,
    LeftSquareTwoTone,
    RightSquareTwoTone,
    LeftOutlined
} from '@ant-design/icons';
import styled from "styled-components";
import {
    removeFilm,
    take,
    prev,
    next
} from "../../adapters/users";
import {formatDate} from '../../helpers'
import AddModal from './add'

const StyledTable = styled(Table)`
  width: 80%;
  margin: 0 auto;
`

const Centered = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
`

const generateTagColor = (tag) => {
    switch (tag) {
        case 'პირველი':
            return '#36cfc9'
        case 'მეორე':
            return '#b37feb'
        default:
            return '#f759ab'
    }
}

const size = 10
const StudentsTable = () => {
    const [rows, setRows] = useState([])

    const callTake = useCallback(() => {
        take(size).then(res => {
            const collection = res.docs.map(o => o.data())
            if (collection && collection.length) {
                setRows(collection)
            }
        })
    }, [])

    useEffect(() => {
        callTake()
    }, [callTake])

    const goPrev = () => {
        const el = rows[0]
        if (el) {
            prev(size, el).then(res => {
                const collection = res.docs.map(o => o.data())
                if (collection && collection.length) {
                    setRows(collection)
                }
            }).catch(() => console.log('failed prev'))
        } else {
            callTake()
        }
    }

    const goNext = () => {
        const el = rows[rows.length - 1]
        if (el) {
            next(size, el).then(res => {
                const collection = res.docs.map(o => o.data())
                if (collection && collection.length) {
                    setRows(collection)
                }
            }).catch(() => console.log('failed next'))
        } else {
            callTake()
        }
    }

    const [order, setOrder] = useState('descend')
    const [info, setInfo] = useState('')
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)}
                            size="small" style={{width: 90}}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined
            style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
    };

    const handleChange = (pagination, filters, sorter) => {
        if (sorter.field === 'birth') {
            setOrder(sorter.order)
            setInfo(sorter.field)
        }
    };
    const handleDelete = useCallback((id) => () => {
        removeFilm(id).then(() => {
            callTake()
            console.log('removed');
        }).catch((e) => {
            console.log(e, 'error while removing');
        })
    }, [callTake])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'ID',
            dataIndex: 'idNumber',
            key: 'idNumber',
            width: '20%',
        },
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: '10%',
        },
        {
            title: 'campus',
            dataIndex: 'campus',
            key: 'campus',
            width: '15%',
            render: (_, row) => (
                <Tag color={generateTagColor(row.campus)} key={row.id}>
                    {row.campus.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'birth',
            dataIndex: 'birth',
            key: 'birth',
            width: '20%',
            sorter: (a, b) => new Date(a.birth).getDate() - new Date(b.birth).getDate(),
            sortOrder: info === 'birth' && order,
            ellipsis: true,
            render: (_, row) => <p>{formatDate(row.birth, 'yyyy.MM.dd')}</p>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '15%',
            render: (_, row) => (
                <>
                    <AddModal student={row} callTake={callTake}/>
                    <Popconfirm key={row.id} title="Sure to delete?"
                                onConfirm={handleDelete(row.id)}>
                        <Button>
                            <DeleteTwoTone twoToneColor="#f5222d"/>
                        </Button>
                    </Popconfirm>
                </>
            )
        },
    ];

    return <>
        <StyledTable
            columns={columns}
            dataSource={rows}
            pagination={false}
            onChange={handleChange}/>
        <Centered>
            <div>
                <Button onClick={goPrev}>
                    <LeftOutlined onClick={goPrev} twoToneColor="#f5222d"/>
                </Button>
                <Button onClick={goNext}>
                    <RightOutlined onClick={goNext} twoToneColor="#f5222d"/>
                </Button>
            </div>
        </Centered>
    </>
}

export default StudentsTable

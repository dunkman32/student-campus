import React, {useCallback, useEffect, useState} from 'react'
import {Table, Input, Button, Space, Popconfirm, Tag} from 'antd';
import Highlighter from 'react-highlight-words';
import {selectors, actions} from '../../modules/Users'
import {
    SearchOutlined,
    DeleteTwoTone,
    RightOutlined,
    LeftOutlined
} from '@ant-design/icons';
import styled from "styled-components";
import {
    removeFilm,
    totalSize
} from "../../adapters/users";
import {formatDate} from '../../helpers'
import AddModal from './add'
import {useDispatch, useSelector} from "react-redux";
import ImagePopup from "./image-popup";

const StyledTable = styled(Table)`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 98%;
  }
`

const Centered = styled.div`
  width: 80%;
  display: flex;
  margin: auto;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
`

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
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

const size = 100
const StudentsTable = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const rows = useSelector(selectors.selectListData)
    const callTake = useCallback(() => {
        dispatch(actions.get.request({
            limit: size
        }))
    }, [dispatch])

    useEffect(() => {
        callTake()
    }, [callTake])

    const goPrev = () => {
        const el = rows[0]
        setPage(page - 1)
        if (el) {
            dispatch(actions.prev.request({
                limit: size,
                first: el
            }))
        } else {
            callTake()
        }
    }

    const goNext = () => {
        const el = rows[rows.length - 1]
        setPage(page + 1)
        if (el) {
            dispatch(actions.next.request({
                limit: size,
                last: el
            }))
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '5%',
            render: (_, row) => {
                return (
                    <ImagePopup row={row}>
                        <Img src={row.img} alt="student"/>
                    </ImagePopup>
                )
            }
        },
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
            width: '15%',
        },
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: '10%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'name',
            width: '20%',
        },
        {
            title: 'campus',
            dataIndex: 'campus',
            key: 'campus',
            width: '10%',
            render: (_, row) => (
                <Tag color={generateTagColor(row.campus)} key={row.id}>
                    {row.campus}
                </Tag>
            )
        },
        {
            title: 'birth',
            dataIndex: 'birth',
            key: 'birth',
            width: '10%',
            sorter: (a, b) => new Date(a.birth).getDate() - new Date(b.birth).getDate(),
            sortOrder: info === 'birth' && order,
            ellipsis: true,
            render: (_, row) => <p>{formatDate(row.birth, 'yyyy.MM.dd')}</p>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (_, row) => (
                <>
                    <AddModal student={row} callTake={callTake}/>
                    <Popconfirm key={row.id} title="Sure to delete?"
                                onConfirm={handleDelete(row.id)}>
                            <DeleteTwoTone style={{ fontSize: "1.25rem", marginLeft: '.5rem' }} twoToneColor="#f5222d"/>
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
                <Button onClick={goPrev} disabled={page === 1}>
                    <LeftOutlined twoToneColor="#f5222d"/>
                </Button>
                <Button onClick={goNext} disabled={page * size >= totalSize}>
                    <RightOutlined twoToneColor="#f5222d"/>
                </Button>
            </div>
        </Centered>
    </>
}

export default StudentsTable

import React, {useCallback, useState} from "react";
import {format, isValid} from "date-fns";
import ImagePopup from "./image-popup";
import {Img, StyledTable} from "./styles";
import {Button, message as notification, Popconfirm, Tag} from "antd";
import {SmileTwoTone, MehTwoTone} from "@ant-design/icons";
import {handleApprove, handleRemove} from "../../adapters/documents";
import {useHistory} from "react-router-dom";
import AddComment from "./Reject";

enum Status {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
}

interface Row {
    userId: string;
    username: string;
    file: any;
    desc: string;
    createdAt: number;
    status?: Status;
    month: number
}

const formatDate = (d: number) => {
    const date = new Date(d);
    if (isValid(date)) {
        return format(date, "yyyy.MM.dd 'at' HH:mm:ss");
    }
    return "undefined";
};

const generateTagColor = (status: Status) => {
    switch (status) {
        case Status.Approved:
            return "#075599";
        case Status.Rejected:
            return "#cb076e";
        default:
            return "#b37feb";
    }
};

const TableComponent = ({
                            data,
                            withLink,
                            changeStatus,
                        }: {
    data: Row[];
    withLink?: boolean;
    changeStatus: (id: number, status: string) => void;
}) => {
    const history = useHistory();
    const [commentModal, setCommentModal] = useState({
        document: null,
        open: false
    })

    const handleCloseCommentModal = () => {
        setCommentModal({
            document: null,
            open: false
        })
    }

    const handleOpenCommentModal = (data: any) => {
        setCommentModal({
            document: data,
            open: true
        })
    }
    const approve = useCallback((row) => () => {
        handleApprove(row).then(() => {
            changeStatus(row.id, 'Approved')
            notification.success('დოკუმენტი მოინიშნა გადახდილად')
        }).catch(() => {
            notification.error('დოკუმენტის სტატუსის ცვლილება ვერ მოხერხდა')
        })
    }, [])

    const columns = [
        {
            title: "Image",
            dataIndex: "file",
            key: "file",
            width: "5%",
            render: (_: any, row: any) => {
                return withLink ? (
                    <ImagePopup row={row}>
                        <Img src={row.file} alt="document"/>
                    </ImagePopup>
                ) : (
                    <a target={"_blank"} href={row.file}>
                        <Img src={row.file} alt="document"/>
                    </a>
                );
            },
        },
        {
            title: "username",
            dataIndex: "username",
            key: "username",
            width: "10%",
        },
        {
            title: "month",
            dataIndex: "month",
            key: "month",
            width: "10%",
            render: (_: any, row: any) => (
               <span>
                   {monthRenderer(row.month)}
               </span>
            ),
        },
        {
            title: "campus",
            dataIndex: "campus",
            key: "campus",
            width: "10%",
            render: (_: any, row: any) => (
                <Tag color={generateTagColor(row.status)} key={row.id}>
                    {row.status}
                </Tag>
            ),
        },
        {
            title: "Description",
            dataIndex: "desc",
            key: "desc",
            width: "15%",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "10%",
            render: (_: any, row: any) =>
                <span>{formatDate(row.createdAt)}</span>,
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "10%",
            render: (_: any, row: any) => (
                <>
                    <Popconfirm
                        key={`approve_${row.id}`}
                        title="Sure to approve?"
                        onConfirm={approve(row)}
                    >
                        <SmileTwoTone style={{fontSize: "1.5rem"}}
                                      twoToneColor='#52c41a'/>
                    </Popconfirm>
                    <Popconfirm
                        key={`reject_${row.id}`}
                        title="Sure to remove?"
                        onConfirm={() => handleOpenCommentModal(row)}
                    >
                        <MehTwoTone style={{fontSize: "1.5rem", marginLeft: '.325rem'}} twoToneColor="#f5222d"/>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const renderColor = (status: Status) => {
        switch (status) {
            case Status.Approved:
                return "tableRowGreen";
            case Status.Rejected:
                return "tableRowRed";
            default:
                return "tableRow";
        }
    };

    const handleRoute = (id: string) => {
        history.push(`/documents/${id}`);
    };

    return (
        <>
            <StyledTable
                onRow={(record: any, index: any) => ({
                    onDoubleClick: () => {
                        withLink && handleRoute(record.userId);
                    },
                })}
                rowClassName={(record: any) => renderColor(record.status)}
                dataSource={data}
                columns={columns}
                pagination={false}
            />
            <AddComment {...commentModal} close={handleCloseCommentModal} changeStatus={changeStatus}/>
        </>
    );
};

const monthRenderer = (m: number) => {
    switch (m) {
        case 0:
            return 'იანვარი'
        case 1:
            return 'თებერვალი'
        case 2:
            return 'მარტი'
        case 3:
            return 'აპრილი'
        case 4:
            return 'მაისი'
        case 5:
            return 'ივნისი'
        case 6:
            return 'ივლისი'
        case 7:
            return 'აგვისტო'
        case 8:
            return 'სექტემბერი'
        case 9:
            return 'ოქტომბერი'
        case 10:
            return 'ნოემბერი'
        case 11:
            return 'დეკემბერი'
        default:
            return '-'
    }
}

export default TableComponent;
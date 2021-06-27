import React, {useState} from "react";
import {format, isValid} from "date-fns";
import ImagePopup from "./image-popup";
import {Img, StyledTable} from "./styles";
import {Button, Popconfirm, Tag} from "antd";
import {SmileTwoTone, MehTwoTone} from "@ant-design/icons";
import {handleApprove} from "../../adapters/documents";
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
                        }: {
    data: Row[];
    withLink?: boolean;
}) => {
    const history = useHistory();
    const [commentModal, setCommentModal] = useState({
        user: null,
        documentId: null,
        open: false
    })

    const handleCloseCommentModal = () => {
        setCommentModal({
            user: null,
            documentId: null,
            open: false
        })
    }

    const handleOpenCommentModal = (data: any) => {
        setCommentModal({
            user: data.user,
            documentId: data.documentId,
            open: true
        })
    }

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
            title: "User Id",
            dataIndex: "userId",
            key: "userId",
            width: "10%",
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
            render: (_: any, row: any) => <span>{formatDate(row.createdAt)}</span>,
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "10%",
            render: (_: any, row: any) => {
                console.log(_, row, 'eeee')

                return (
                    <>
                        <Popconfirm
                            key={`approve_${row.id}`}
                            title="Sure to approve?"
                            onConfirm={() => handleApprove(row)}
                        >
                            <SmileTwoTone style={{fontSize: "1.5rem"}} twoToneColor='#52c41a'/>
                        </Popconfirm>
                        <Popconfirm
                            key={`reject_${row.id}`}
                            title="Sure to remove?"
                            onConfirm={() => handleOpenCommentModal({
                                user: row.userId,
                                documentId: row.id
                            })}
                        >
                            <MehTwoTone style={{fontSize: "1.5rem", marginLeft: '.325rem'}} twoToneColor="#f5222d"/>
                        </Popconfirm>
                    </>
                )
            },
        },
    ];

    console.log(data, 'sss');

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
            <AddComment {...commentModal} close={handleCloseCommentModal}/>
        </>
    );
};

export default TableComponent;

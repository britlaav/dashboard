import { useEffect, useState } from "react";
import { getCustomers } from "../../API/api";
import { Card, Space, Table, Typography } from "antd";

const Customers = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setdataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getCustomers().then((res) => {
            setdataSource(res.users);
            setLoading(false);
        });
    }, []);

    return (
        <Space direction="vertical">
            <Typography.Title
                level={3}
                style={{ display: "flex", justifyContent: "center" }}
            >
                Customers
            </Typography.Title>
            <Card>
                <Table
                    rowKey="id"
                    loading={loading}
                    columns={[
                        {
                            title: "First Name",
                            dataIndex: "firstName",
                            id: "1",
                            ellipsis: true,
                            responsive: ["xs", "sm", "md", "lg"],
                        },
                        {
                            title: "Last Name",
                            dataIndex: "lastName",
                            id: "2",
                            ellipsis: true,
                            responsive: ["xs", "sm", "md", "lg"],
                        },
                        {
                            title: "email",
                            dataIndex: "email",
                            id: "3",
                            ellipsis: true,
                            responsive: ["xs", "sm", "md", "lg"],
                        },
                        {
                            title: "Phone",
                            dataIndex: "phone",
                            id: "4",
                            ellipsis: true,
                            responsive: ["xs", "sm", "md", "lg"],
                        },
                        {
                            title: "Address",
                            dataIndex: "address",
                            id: "5",
                            ellipsis: true,
                            responsive: ["xs", "sm", "md", "lg"],
                            render: (address) => {
                                return (
                                    <span>
                                        {address.address} , {address.city}
                                    </span>
                                );
                            },
                        },
                    ]}
                    dataSource={dataSource}
                    pagination={{ pageSize: 5 }}
                ></Table>
            </Card>
        </Space>
    );
};

export default Customers;

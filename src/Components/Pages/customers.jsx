import { useEffect, useState } from "react";
import { getCustomers } from "../../API/api";
import { Row, Space, Table, Typography } from "antd";

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
        <Space direction="vertical" style={{ width: "97%" }}>
            <Row style={{ paddingLeft: 25, paddingTop: 15 }}>
                <Typography.Title level={2}>Customers</Typography.Title>
            </Row>
            <Table
                style={{ paddingLeft: 35 }}
                scroll={{ x: "max-content" }}
                rowKey="id"
                loading={loading}
                columns={[
                    {
                        title: "First Name",
                        dataIndex: "firstName",
                        id: "1",
                    },
                    {
                        title: "Last Name",
                        dataIndex: "lastName",
                        id: "2",
                    },
                    {
                        title: "email",
                        dataIndex: "email",
                        id: "3",
                    },
                    {
                        title: "Phone",
                        dataIndex: "phone",
                        id: "4",
                    },
                    {
                        title: "Address",
                        dataIndex: "address",
                        id: "5",
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
                pagination={{ pageSize: 4 }}
            />
        </Space>
    );
};

export default Customers;

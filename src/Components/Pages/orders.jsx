import { Avatar, Rate, Row, Space, Table, Typography } from "antd";
import { useState, useEffect } from "react";
import { getOrders } from "../../API/api";
import Link from "antd/es/typography/Link";
import AppFooter from "../app-footer";

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setdataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            setdataSource(res.products);
            setLoading(false);
        });
    }, []);
    return (
        <Space direction="vertical" style={{ width: "97%" }}>
            <Row style={{ paddingLeft: 25, paddingTop: 15 }}>
                <Typography.Title level={2}>Orders</Typography.Title>
            </Row>
            <Table
                size="large"
                rowKey={"id"}
                style={{ paddingLeft: 25, paddingTop: 30 }}
                pagination={false}
                scroll={{ x: "max-content" }}
                loading={loading}
                columns={[
                    { id: "1", title: "Title", dataIndex: "title" },
                    {
                        id: "2",
                        title: "Price",
                        dataIndex: "price",
                        render: (value) => <span>${value}</span>,
                    },
                    { id: "3", title: "Quantity", dataIndex: "quantity" },
                    {
                        id: "4",
                        title: "Total",
                        dataIndex: "total",
                        render: (value) => <span>${value}</span>,
                    },
                    {
                        id: "5",
                        title: "discounted Price",
                        dataIndex: "discountedTotal",
                        render: (value) => <span>${value}</span>,
                    },
                ]}
                dataSource={dataSource}
            />
        </Space>
    );
};

export default Orders;

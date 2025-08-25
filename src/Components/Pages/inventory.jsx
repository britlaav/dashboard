import { Avatar, Card, Rate, Row, Space, Table, Typography } from "antd";
import { useState, useEffect } from "react";
import { getInventory } from "../../API/api";

const Inventory = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setdataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        getInventory().then((res) => {
            setdataSource(res.products);
            setLoading(false);
        });
    }, []);
    return (
        <Space direction="vertical" style={{ width: "97%" }}>
            <Row style={{ paddingLeft: 25, paddingTop: 15 }}>
                <Typography.Title level={2}>Inventory</Typography.Title>
            </Row>

            <Table
                scroll={{ x: "max-content" }}
                style={{ paddingLeft: 25, paddingTop: 30 }}
                size="small"
                rowKey={"id"}
                loading={loading}
                columns={[
                    {
                        ellipsis: "true",
                        title: "Thumbnail",
                        id: "1",
                        dataIndex: "thumbnail",
                        render: (Link) => {
                            return <Avatar src={Link} />;
                        },
                    },
                    {
                        ellipsis: "true",
                        title: "Title",
                        id: "2",
                        dataIndex: "title",
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        id: "3",
                        render: (value) => <span>${value}</span>,
                    },
                    {
                        title: "Rating",
                        dataIndex: "rating",
                        id: "4",
                        render: (rating) => {
                            return <Rate value={rating} allowhalf disabled />;
                        },
                    },
                    {
                        title: "Stock",
                        id: "5",
                        dataIndex: "stock",
                    },
                    {
                        title: "Category",
                        id: "6",
                        dataIndex: "category",
                    },
                ]}
                dataSource={dataSource}
                pagination={{ pageSize: 4 }}
            />
        </Space>
    );
};

export default Inventory;

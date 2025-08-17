import { Avatar, Rate, Space, Table, Typography } from "antd";
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
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Inventory</Typography.Title>
            <Table
                rowKey={"id"}
                loading={loading}
                columns={[
                    {
                        title: "Thumbnail",
                        id: "1",
                        dataIndex: "thumbnail",
                        render: (Link) => {
                            return <Avatar src={Link} />;
                        },
                    },
                    {
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
                pagination={{ pageSize: 5 }}
            ></Table>
        </Space>
    );
};

export default Inventory;

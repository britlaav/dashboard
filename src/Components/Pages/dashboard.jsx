import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";

import { Card, Col, Row, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
    getOrders,
    getCustomers,
    getInventory,
    getRevenue,
} from "../../API/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Dashboard = () => {
    const [customers, setCustomers] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [orders, setOrders] = useState(0);

    useEffect(() => {
        getOrders().then((res) => {
            setOrders(res.total);
            setRevenue(res.discountedTotal);
        });

        getInventory().then((res) => {
            setInventory(res.total);
        });

        getCustomers().then((res) => {
            setCustomers(res.total);
        });
    }, []);

    return (
        <Space direction="vertical" size={"20px"}>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space
                direction="horizontal"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {" "}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DashboardCard
                            icon={
                                <ShoppingCartOutlined
                                    style={{
                                        color: "green",
                                        backgroundColor: "rgba(0,255,0,0.25)",
                                        borderRadius: "20px",
                                        fontSize: "24px",
                                        padding: "8px",
                                    }}
                                />
                            }
                            title={"Orders"}
                            value={orders}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DashboardCard
                            icon={
                                <ShoppingOutlined
                                    style={{
                                        color: "blue",
                                        backgroundColor: "rgba(0,0,255,0.25)",
                                        borderRadius: "20px",
                                        fontSize: "24px",
                                        padding: "8px",
                                    }}
                                />
                            }
                            title={"Inventory"}
                            value={inventory}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DashboardCard
                            icon={
                                <UserOutlined
                                    style={{
                                        color: "purple",
                                        backgroundColor: "rgba(0,255,255,0.25)",
                                        borderRadius: "20px",
                                        fontSize: "24px",
                                        padding: "8px",
                                    }}
                                />
                            }
                            title={"Customers"}
                            value={customers}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <DashboardCard
                            icon={
                                <DollarCircleOutlined
                                    style={{
                                        color: "red",
                                        backgroundColor: "rgba(255,0,0,0.25)",
                                        borderRadius: "20px",
                                        fontSize: "24px",
                                        padding: "8px",
                                    }}
                                />
                            }
                            title={"Revenue"}
                            value={revenue}
                        />
                    </Col>
                </Row>
            </Space>
            <Space>
                <RecentOrders />
            </Space>
        </Space>
    );
};

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            setDataSource(res.products.splice(0, 3));
            setLoading(false);
        });
    }, []);

    return (
        <Space direction="vertical">
            <Typography.Text>Recent Orders</Typography.Text>
            <Space>
                <Table
                    rowKey="id"
                    columns={[
                        {
                            id: "1",
                            title: "Title",
                            dataIndex: "title",
                            responsive: ["xs", "sm", "md", "lg"],
                        },
                        {
                            title: "Quantity",
                            dataIndex: "quantity",
                            id: "2",
                            responsive: ["xs", "sm", "md", "lg"],
                        },
                        {
                            title: "Price",
                            dataIndex: "discountedTotal",
                            id: "2",
                            responsive: ["xs", "sm", "md", "lg"],
                        },
                    ]}
                    loading={loading}
                    dataSource={dataSource}
                    pagination={false}
                ></Table>
                <DashboardChart />
            </Space>
        </Space>
    );
}

function DashboardChart() {
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        getRevenue().then((res) => {
            const labels = res.carts.map((cart) => {
                return `User-${cart.userId}`;
            });
            const data = res.carts.map((cart) => {
                return cart.discountedTotal;
            });

            const dataSource = {
                labels,
                datasets: [
                    {
                        label: "Revenue",
                        data: data,
                        backgroundColor: "rgba(255, 0,0,1)",
                    },
                ],
            };
            setRevenueData(dataSource);
        });
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Order Revenue",
            },
        },
    };

    return (
        <Card style={{ width: "100%", height: 250 }}>
            <div style={{ height: "100%" }}>
                <Bar options={options} data={revenueData} />
            </div>
        </Card>
    );
}

export default Dashboard;

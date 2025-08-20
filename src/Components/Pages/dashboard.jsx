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
        <>
            <Space direction="vertical" style={{ width: "92%" }}>
                <Row style={{ paddingLeft: 25, paddingTop: 16 }}>
                    <Typography.Title level={2}>Dashboard</Typography.Title>
                </Row>

                <Row style={{ paddingLeft: 25 }} gutter={[8, 10]}>
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
                <Row gutter={[35, 16]} style={{ padding: "20px 0 0 25px" }}>
                    <Col span={12} xs={24} sm={12}>
                        <RecentOrders />
                    </Col>
                    <Col span={12} xs={24} sm={12}>
                        <DashboardChart />
                    </Col>
                </Row>
            </Space>
        </>
    );
};

function DashboardCard({ title, value, icon }) {
    return (
        <Card hoverable size="small">
            <Space>
                {icon}
                <Statistic precision={0} title={title} value={value} />
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
        <Card title="Recent Orders">
            <Table
                size="small"
                rowKey="id"
                columns={[
                    {
                        id: "1",
                        title: "Title",
                        dataIndex: "title",
                        ellipsis: "true",
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantity",
                        id: "2",
                        ellipsis: "true",
                    },
                    {
                        title: "Price",
                        dataIndex: "discountedTotal",
                        id: "2",
                        ellipsis: "true",
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            />
        </Card>
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
        },
    };

    return (
        <Card title={"Order Revenue"}>
            <Bar options={options} data={revenueData} />
        </Card>
    );
}

export default Dashboard;

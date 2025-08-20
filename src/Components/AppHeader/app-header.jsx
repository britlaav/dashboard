import { BellOutlined, MailOutlined } from "@ant-design/icons";
import {
    Image,
    Typography,
    Space,
    Layout,
    Badge,
    Drawer,
    List,
    Row,
    Col,
} from "antd";
import Icon from "../../assets/Icon.png";
import { getOrders, getComments } from "../../API/api";
import { useEffect, useState } from "react";
const { Header } = Layout;

function AppHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {
        getComments().then((res) => {
            setComments(res.comments);
        });
        getOrders().then((res) => {
            setOrders(res.products);
        });
    }, []);

    return (
        <Layout>
            <Header
                style={{
                    padding: "0 16px",
                }}
            >
                <Row justify={"space-between"} align={"middle"}>
                    <Col xs={16} md={6}>
                        <Space>
                            <Image
                                src={Icon}
                                width={40}
                                style={{ borderRadius: "50%" }}
                                preview={false}
                            />
                            <Typography.Title
                                level={2}
                                style={{ color: "white" }}
                            >
                                TrackHub
                            </Typography.Title>
                        </Space>
                    </Col>
                    <Col xs={8} md={6} style={{ textAlign: "right" }}>
                        <Space size={"large"}>
                            <Badge count={comments.length} dot>
                                <MailOutlined
                                    style={{ fontSize: 22, color: "white" }}
                                    onClick={() => {
                                        setCommentsOpen(true);
                                    }}
                                ></MailOutlined>
                            </Badge>
                            <Badge count={orders.length}>
                                <BellOutlined
                                    style={{ fontSize: 22, color: "white" }}
                                    onClick={() => {
                                        setNotificationsOpen(true);
                                    }}
                                />
                            </Badge>
                        </Space>
                    </Col>
                </Row>
                <Drawer
                    title="Comments"
                    open={commentsOpen}
                    onClose={() => {
                        setCommentsOpen(false);
                    }}
                    maskClosable
                >
                    <List
                        dataSource={comments}
                        renderItem={(item) => {
                            return <List.Item>{item.body}</List.Item>;
                        }}
                    />
                </Drawer>

                <Drawer
                    title="Notifications"
                    open={notificationsOpen}
                    onClose={() => {
                        setNotificationsOpen(false);
                    }}
                    maskClosable
                >
                    <List
                        dataSource={orders}
                        renderItem={(item) => {
                            return (
                                <List.Item>
                                    <Typography.Text strong>
                                        {item.title}
                                    </Typography.Text>
                                    has been ordered.
                                </List.Item>
                            );
                        }}
                    />
                </Drawer>
            </Header>
        </Layout>
    );
}
export default AppHeader;

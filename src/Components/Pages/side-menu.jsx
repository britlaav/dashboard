import React, { useEffect, useState } from "react";
import {
    UserOutlined,
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

function SideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKeys, setsSelectedKeys] = useState("/");

    useEffect(() => {
        const pathName = location.pathname;
        setsSelectedKeys(pathName);
    }, [location.pathname]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Sider breakpoint="lg" style={{ background: colorBgContainer }}>
            <Menu
                onClick={(item) => {
                    navigate(item.key);
                }}
                selectedKeys={[selectedKeys]}
                items={[
                    {
                        label: "Dashboard",
                        key: "/",
                        icon: <AppstoreOutlined />,
                    },
                    {
                        label: "Inventory",
                        key: "/inventory",
                        icon: <ShopOutlined />,
                    },
                    {
                        label: "Orders",
                        key: "/orders",
                        icon: <ShoppingCartOutlined />,
                    },
                    {
                        label: "Customers",
                        key: "/customers",
                        icon: <UserOutlined />,
                    },
                ]}
            />
        </Sider>
    );
}

export default SideMenu;

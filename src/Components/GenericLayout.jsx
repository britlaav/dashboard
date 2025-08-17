import { Layout } from "antd";
import AppHeader from "./AppHeader/app-header";
import SideMenu from "./SideMenu/side-menu";

const { Footer } = Layout;
function GenericLayout({ children }) {
    return (
        <Layout>
            <AppHeader />
            <Layout>
                <SideMenu />
                <Layout>{children}</Layout>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
}
export default GenericLayout;

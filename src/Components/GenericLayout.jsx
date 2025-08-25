import { Layout } from "antd";
import AppHeader from "./app-header";
import SideMenu from "./side-menu";
import AppFooter from "./app-footer";

const { Footer } = Layout;
function GenericLayout({ children }) {
    return (
        <Layout>
            <AppHeader />
            <Layout>
                <SideMenu />
                <Layout
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ minHeight: "76vh" }}>{children}</div>
                    <Footer>
                        <AppFooter />
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
export default GenericLayout;

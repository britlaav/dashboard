import { Layout } from "antd";
import AppHeader from "./AppHeader/app-header";
import SideMenu from "./Pages/side-menu";
import AppFooter from "./AppFooter/app-footer";
import { Content } from "antd/es/layout/layout";

const { Footer } = Layout;
function GenericLayout({ children }) {
    return (
        <>
            <Layout>
                <AppHeader />
                <Layout>
                    <SideMenu />
                    <Layout>
                        {children}
                        <Footer>
                            <AppFooter />
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}
export default GenericLayout;

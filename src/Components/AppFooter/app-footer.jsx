import { Typography } from "antd";

function AppFooter() {
    return (
        <div className="app-footer">
            <Typography.Link href="tel:+91-7645625317">
                +91-9765765767
            </Typography.Link>
            <Typography.Link href="https:www.google.com" target={"_blank"}>
                {" "}
                Privacy Policy{" "}
            </Typography.Link>
            <Typography.Link href="https:www.google.com" target={"_blank"}>
                {" "}
                Terms & Conditions{" "}
            </Typography.Link>
        </div>
    );
}

export default AppFooter;

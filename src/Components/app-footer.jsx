import { Col, Row, Typography } from "antd";

function AppFooter() {
    return (
        <Row justify={"center"} style={{ paddingTop: 10 }}>
            <Col>
                <Typography.Link
                    href="tel:+91-7645625317"
                    style={{ marginRight: "8px" }}
                >
                    +91-9765765767
                </Typography.Link>
            </Col>
            <Col>
                <Typography.Link
                    href="https:www.google.com"
                    target={"_blank"}
                    style={{ marginRight: "8px" }}
                >
                    Privacy Policy
                </Typography.Link>
            </Col>
            <Col>
                <Typography.Link href="https:www.google.com" target={"_blank"}>
                    Terms & Conditions
                </Typography.Link>
            </Col>
        </Row>
    );
}

export default AppFooter;

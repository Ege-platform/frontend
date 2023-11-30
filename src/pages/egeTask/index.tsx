import { Row, Col, Progress } from "antd";
import { observer } from "mobx-react-lite";

const data = [{}];

const EgePage = observer(() => {
    return (
        <Row>
            <Col>
                <Progress />
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
    );
});
export default EgePage;

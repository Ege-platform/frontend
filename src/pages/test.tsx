import { Col, Row } from "antd";
import { TaskButton, TaskInfo } from "../components/taskButton";

export default function Test() {
    return (
        <>
            <div style={{ backgroundColor: "#10062B", height: "1000px" }}>
                <Col>
                    <Row>
                        <TaskButton taskNumber={10} />
                        <TaskInfo taskNumber={10} text={"описание задания"} />
                    </Row>
                </Col>

                <TaskButton taskNumber={10} active={false} />

                <TaskButton active={false} />
                <TaskButton />
            </div>
        </>
    );
}

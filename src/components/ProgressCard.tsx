import { Card, Progress, Row, Col, Typography } from "antd";

const { Text } = Typography;

interface ProgressCardProps {
  title: string;
  percent: number;
}

const ProgressCard = ({ title, percent }: ProgressCardProps) => {
  return (
    <Card>
      <Row justify={"center"} gutter={[4, 4]}>
        <Col span={24}>
          <Text type="secondary">{title}</Text>
        </Col>
        <Col span={24}>
          <Row justify={"center"}>
            <Progress
              type="dashboard"
              percent={percent}
              strokeWidth={10}
              trailColor="rgba(0, 0, 0, 0.06)"
              size={160}
            />
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ProgressCard;

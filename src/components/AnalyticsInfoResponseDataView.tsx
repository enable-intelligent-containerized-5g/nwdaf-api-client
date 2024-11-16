import { Card, Col, Descriptions, Progress, Row, Statistic } from "antd";
import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnalyticsNfLoad } from "../models/api";
import { DescriptionsItemType } from "antd/es/descriptions";
import Title from "antd/es/typography/Title";

const AnalyticsInfoResponseDataView = ({
  analyticsInfo,
  className,
  ...props
}: AnalyticsInfoViewProps) => {
  const { container, cpuUsage, nfType, memUsage, cpuLimit, memLimit, nfLoad } =
    analyticsInfo;
  const [stepsCount] = useState(5);
  const [stepsGap] = useState(7);
  const [percentCPU, setPercentCPU] = useState(0);
  const [percentMem, setPercentMem] = useState(0);

  useEffect(() => {
    const percet = (cpuUsage / cpuLimit) * 100;
    setPercentCPU(percet);
  }, [cpuUsage, cpuLimit]);

  useEffect(() => {
    const percet = (memUsage / memLimit) * 100;
    setPercentMem(percet);
  }, [memUsage, memLimit]);

  return (
    <section className={twMerge(className, "")} {...props}>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col flex="auto">
          <Title level={2}>
            {container} - {nfType}
          </Title>
          <Descriptions
            items={descriptionItemsInit.map(({ key, label }) => ({
              key,
              label,
              children: analyticsInfo[label],
            }))}
          />
        </Col>
        <Col>
          <Card>
            <Statistic title="CPU Load" value={nfLoad.cpuLoad} suffix="cores" />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic title="Memory Load" value={nfLoad.memLoad} suffix="KB" />
          </Card>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col>
              <Card>
                <Progress
                  type="circle"
                  percent={percentCPU}
                  steps={{ count: stepsCount, gap: stepsGap }}
                  strokeWidth={20}
                />
              </Card>
            </Col>
            <Col>
              <Card>
                <Progress
                  type="circle"
                  percent={percentMem}
                  steps={{ count: stepsCount, gap: stepsGap }}
                  strokeWidth={20}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

type AnalyticsInfoViewProps = ComponentProps<"section"> & {
  analyticsInfo: AnalyticsNfLoad;
};

const descriptionItemsInit: DescriptionsItemType[] = [
  {
    key: "1",
    label: "container",
    children: "value",
  },
  {
    key: "2",
    label: "pod",
    children: "value",
  },
  {
    key: "3",
    label: "nfInstanceId",
    children: "value",
  },
  {
    key: "4",
    label: "nfType",
    children: "value",
  },
  {
    key: "5",
    label: "nfStatus",
    children: "value",
  },
];

export default AnalyticsInfoResponseDataView;

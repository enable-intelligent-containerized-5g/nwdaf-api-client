import {
  Card,
  Col,
  Descriptions,
  Progress,
  Row,
  Statistic,
  Typography,
} from "antd";
import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnalyticsNfLoad } from "../models/api";
import { DescriptionsItemType } from "antd/es/descriptions";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

const AnalyticsInfoResponseDataView = ({
  analyticsInfo,
  className,
  ...props
}: AnalyticsInfoViewProps) => {
  const { container, cpuUsage, nfType, memUsage, cpuLimit, memLimit, nfLoad } =
    analyticsInfo;
  const [percentCPU, setPercentCPU] = useState<number>(0);
  const [percentMem, setPercentMem] = useState<number>(0);

  useEffect(() => {
    const percent = (cpuUsage / cpuLimit) * 100;
    const value = !isFinite(percent) || isNaN(percent) ? 0 : percent;
    setPercentCPU(value);
  }, [cpuUsage, cpuLimit]);

  useEffect(() => {
    const percent = (memUsage / memLimit) * 100;
    const value = !isFinite(percent) || isNaN(percent) ? 0 : percent;
    setPercentMem(value);
  }, [memUsage, memLimit]);

  const descriptionItems = descriptionItemsInit.map(({ key, label }) => {
    const value = analyticsInfo[label as keyof AnalyticsNfLoad];

    // Si value es un objeto NfLoad, convertimos a algo que sea renderizable
    const children =
      value && typeof value === "object" && "cpuLimit" in value
        ? `${value.cpuLimit} (CPU Limit)` // Ejemplo de cómo renderizar parte de NfLoad
        : value !== undefined
          ? value
          : "N/A"; // Valor predeterminado si no existe

    return {
      key,
      label,
      children, // Ahora children es siempre un string, number o ReactNode
    } as DescriptionsItemType;
  });

  return (
    <section className={twMerge(className, "")} {...props}>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col flex="auto">
          <Row>
            <Title level={2}>
              {container} - {nfType}
            </Title>
            <Descriptions items={descriptionItems} />
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={6}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Card>
                    <Statistic
                      title="CPU Load"
                      value={nfLoad.cpuLoad}
                      suffix="cores"
                    />
                  </Card>
                </Col>
                <Col span={24}>
                  <Card>
                    <Statistic
                      title="Memory Load"
                      value={nfLoad.memLoad}
                      suffix="KB"
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={18}>
              <Row gutter={[16, 16]} justify={"center"}>
                <Col span={12}>
                  <Card>
                    <Row justify={"center"} gutter={[4, 4]}>
                      <Col span={24}>
                        <Text type="secondary">CPU Usage</Text>
                      </Col>
                      <Col span={24}>
                        <Row justify={"center"}>
                          <Progress
                            type="dashboard"
                            percent={percentCPU}
                            steps={8}
                            strokeWidth={20}
                            trailColor="rgba(0, 0, 0, 0.06)"
                            size={160}
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Row justify={"center"} gutter={[4, 4]}>
                      <Col span={24}>
                        <Text type="secondary">Memory Usage</Text>
                      </Col>
                      <Col span={24}>
                        <Row justify={"center"}>
                          <Progress
                            type="dashboard"
                            percent={percentMem}
                            steps={8}
                            strokeWidth={20}
                            trailColor="rgba(0, 0, 0, 0.06)"
                            size={160}
                          />
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
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
    children: "",
  },
  {
    key: "2",
    label: "pod",
    children: "",
  },
  {
    key: "3",
    label: "nfInstanceId",
    children: "",
  },
  {
    key: "4",
    label: "nfType",
    children: "",
  },
  {
    key: "5",
    label: "nfStatus",
    children: "",
  },
];

export default AnalyticsInfoResponseDataView;

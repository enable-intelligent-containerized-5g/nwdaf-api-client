import { ComponentProps } from "react";
import { MlModelTrainingResponseData } from "../models/api";
import { twMerge } from "tailwind-merge";
import { Card, Col, Descriptions, Row, Statistic, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import { DescriptionsItemType } from "antd/es/descriptions";

const MlModelTrainingResponseDataView = ({
  mlModelTraining,
  className,
  ...props
}: MlModelTrainingResponseDataViewProps) => {
  const { name, confidence, figure } = mlModelTraining;
  const { mse, r2, mse_cpu, r2_cpu, mse_mem, r2_mem } = confidence;

  const tabs: TabsProps["items"] = [
    {
      key: "tab1",
      label: "Stats",
      children: (
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Card>
                    <Statistic title="Average MSE" value={mse} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic title="Average R²" value={r2} />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Card>
                    <Statistic title="CPU MSE" value={mse_cpu} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic title="CPU R²" value={r2_cpu} />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Card>
                    <Statistic title="Memory MSE" value={mse_mem} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic title="Memory R²" value={r2_mem} />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      ),
    },
    {
      key: "tab2",
      label: "Graph",
      children: (
        <Col span={24}>
          <img src={`data:image/png;base64,${figure}`} />
        </Col>
      ),
    },
  ];

  const descriptionItems = descriptionItemsInit.map(({ key, label }) => {
    const value = mlModelTraining[label as keyof MlModelTrainingResponseData];

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
    <div className={twMerge(className, "")} {...props}>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col span={24}>
          <Title level={2}>{name}</Title>
          <Descriptions items={descriptionItems} size={"small"} />
          <Tabs defaultActiveKey="1" items={tabs} />
        </Col>
      </Row>
    </div>
  );
};

type MlModelTrainingResponseDataViewProps = ComponentProps<"div"> & {
  mlModelTraining: MlModelTrainingResponseData;
};

const descriptionItemsInit: DescriptionsItemType[] = [
  {
    key: "1",
    label: "eventId",
    children: "value",
  },
  {
    key: "2",
    label: "nfType",
    children: "value",
  },
  {
    key: "3",
    label: "targetPeriod",
    children: "value",
  },
  {
    key: "4",
    label: "accuracy",
    children: "value",
  },
  {
    key: "5",
    label: "size",
    children: "value",
  },
];

export default MlModelTrainingResponseDataView;

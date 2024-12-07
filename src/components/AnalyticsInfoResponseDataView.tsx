import { Col, Descriptions, Row, Tabs, TabsProps } from "antd";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { AnalyticsNfLoad } from "../models/api";
import { DescriptionsItemType } from "antd/es/descriptions";
import Title from "antd/es/typography/Title";
import NfInfoStatisticComponent from "./NfInfoStatisticComponent";
import ConfidenceComponent from "./ConfidenceComponent";

const AnalyticsInfoResponseDataView = ({
  analyticsInfo,
  className,
  ...props
}: AnalyticsInfoViewProps) => {
  const {
    container,
    cpuUsage,
    nfType,
    memUsage,
    cpuLimit,
    memLimit,
    throughput,
    nfLoad,
    confidence,
  } = analyticsInfo;
  const { mse, r2, mseCpu, r2Cpu, mseMem, r2Mem, mseThroughput, r2Throughput } =
    confidence;

  const hasValidConfidence = Object.values({
    mse,
    r2,
    mseCpu,
    r2Cpu,
    mseMem,
    r2Mem,
    mseThroughput,
    r2Throughput,
  }).some((value) => value !== null && value !== undefined && value !== 0);

  const tabs: TabsProps["items"] = [
    {
      key: "tab1",
      label: "NF Info",
      children: (
        <NfInfoStatisticComponent
          cpuUsage={cpuUsage}
          memUsage={memUsage}
          cpuLimit={cpuLimit}
          memLimit={memLimit}
          nfLoad={nfLoad}
          throughput={throughput}
        />
      ),
    },
    ...(hasValidConfidence
      ? [
          {
            key: "tab2",
            label: "Confidence",
            children: (
              <ConfidenceComponent
                className="width-full"
                mse={mse}
                r2={r2}
                mseCpu={mseCpu}
                r2Cpu={r2Cpu}
                mseMem={mseMem}
                r2Mem={r2Mem}
                mseThroughput={mseThroughput}
                r2Throughput={r2Throughput}
              />
            ),
          },
        ]
      : []),
  ];

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
            <Descriptions items={descriptionItems} size={"small"} />
            <Col span={"24"}>
              <Tabs defaultActiveKey="1" items={tabs} />
            </Col>
          </Row>
        </Col>
        <Col span={24}></Col>
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
    key: "4",
    label: "nfType",
    children: "",
  },
  {
    key: "2",
    label: "pod",
    children: "",
  },
  {
    key: "5",
    label: "nfStatus",
    children: "",
  },
  {
    key: "3",
    label: "nfInstanceId",
    children: "",
  },
];

export default AnalyticsInfoResponseDataView;

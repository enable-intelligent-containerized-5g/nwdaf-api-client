import { ComponentProps } from "react";
import { MlModelTrainingResponseData } from "../models/api";
import { twMerge } from "tailwind-merge";
import { Col, Descriptions, Row, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import { DescriptionsItemType } from "antd/es/descriptions";
import ConfidenceComponent from "./ConfidenceComponent";

const MlModelTrainingResponseDataView = ({
  mlModelTraining,
  className,
  ...props
}: MlModelTrainingResponseDataViewProps) => {
  const { name, confidence, figure } = mlModelTraining;
  const { mse, r2, mseCpu, r2Cpu, mseMem, r2Mem } = confidence;

  const tabs: TabsProps["items"] = [
    {
      key: "tab1",
      label: "Stats",
      children: (
        <ConfidenceComponent
          mse={mse}
          r2={r2}
          mseCpu={mseCpu}
          r2Cpu={r2Cpu}
          mseMem={mseMem}
          r2Mem={r2Mem}
        />
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

  const formatBytes = (bytes: number): { value: string; unit: string } => {
    if (bytes === 0)
      return {
        value: "0",
        unit: "B",
      };

    const units = ["B", "KB", "MB", "GB", "TB"];
    const k = 1024;

    // Determina la unidad más adecuada
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Calcula el valor convertido
    const value = bytes / Math.pow(k, i);

    // Devuelve el valor con 2 decimales y la unidad correspondiente
    return {
      value: value.toFixed(2),
      unit: units[i],
    };
  };

  const descriptionItems = descriptionItemsInit.map(({ key, label }) => {
    let value = mlModelTraining[label as keyof MlModelTrainingResponseData];

    if (label === "targetPeriod") {
      value = Number(value) / 60 + "m";
    }

    if (label === "size") {
      value =
        formatBytes(Number(value)).value +
        " " +
        formatBytes(Number(value)).unit;
    }

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

import { Row, Col } from "antd";
import { ComponentProps } from "react";
import { NfLoad } from "../models/api";
import { twMerge } from "tailwind-merge";
import StatisticCard from "./StatisticCard";
import ProgressCard from "./ProgressCard";
import MetricCard from "./MetricCard"; // Importamos el nuevo componente reutilizable

const NfInfoStatisticComponent = ({
  className,
  cpuUsage,
  memUsage,
  cpuLimit,
  memLimit,
  nfLoad,
  throughput,
  ...props
}: NfInfoStatisticComponentProps) => {
  const formatBytes = (bytes: number): { value: string; unit: string } => {
    if (bytes === 0) return { value: "0", unit: "B" };

    const units = ["B", "KB", "MB", "GB", "TB"];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = bytes / Math.pow(k, i);

    return { value: value.toFixed(2), unit: units[i] };
  };

  const formatCores = (cores: number): { value: string; unit: string } => {
    if (cores === 0) return { value: "0", unit: "Cores" };

    const units = ["µCores", "mCores", "Cores"];
    let value: number;
    let unit: string;

    if (cores < 0.001) {
      value = cores * 1e6;
      unit = units[0];
    } else if (cores < 1) {
      value = cores * 1000;
      unit = units[1];
    } else {
      value = cores;
      unit = units[2];
    }

    return { value: value.toFixed(2), unit };
  };

  const approximateToPercentage = (num: number) => (num * 100).toFixed(2);

  const statistics = [
    {
      title: "CPU Usage",
      value: formatCores(cpuUsage).value,
      unit: formatCores(cpuUsage).unit,
    },
    {
      title: "Memory Usage",
      value: formatBytes(memUsage).value,
      unit: formatBytes(memUsage).unit,
    },
    {
      title: "CPU Limit",
      value: formatCores(cpuLimit).value,
      unit: formatCores(cpuLimit).unit,
    },
    {
      title: "Memory Limit",
      value: formatBytes(memLimit).value,
      unit: formatBytes(memLimit).unit,
    },
  ];

  const valueFormatterThroughput = (value: number) => {
    if (value === 0) return "0";
    const units = ["bps", "Kbps", "Mbps", "Gbps"];
    const k = 1024;
    const i = Math.floor(Math.log(value) / Math.log(k));
    const formattedValue = value / Math.pow(k, i);
    return `${formattedValue.toFixed(2)} ${units[i]}`;
  };

  return (
    <div className={twMerge(className, "")} {...props}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col span={12}>
              <MetricCard
                title="Throughput"
                value={throughput}
                valueFormatter={valueFormatterThroughput}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            {statistics.map((stat, index) => (
              <Col span={12} key={index}>
                <StatisticCard
                  title={stat.title}
                  value={stat.value}
                  unit={stat.unit}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col span={12}>
              <ProgressCard
                title="CPU Load"
                percent={Number(approximateToPercentage(nfLoad.cpuLoad))}
              />
            </Col>
            <Col span={12}>
              <ProgressCard
                title="Memory Load"
                percent={Number(approximateToPercentage(nfLoad.memLoad))}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

type NfInfoStatisticComponentProps = ComponentProps<"div"> & {
  cpuUsage: number;
  memUsage: number;
  cpuLimit: number;
  memLimit: number;
  nfLoad: NfLoad;
  throughput: number;
};

export default NfInfoStatisticComponent;

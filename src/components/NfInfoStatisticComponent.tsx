import { Card, Col, Progress, Row, Statistic, Typography } from "antd";
import { ComponentProps } from "react";
import { NfLoad } from "../models/api";
import { twMerge } from "tailwind-merge";

const { Text } = Typography;

const NfInfoStatisticComponent = ({
  className,
  cpuUsage,
  memUsage,
  cpuLimit,
  memLimit,
  nfLoad,
  ...props
}: NfInfoStatisticComponentProps) => {
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

  const formatCores = (cores: number): { value: string; unit: string } => {
    if (cores === 0) {
      return {
        value: "0",
        unit: "Cores",
      };
    }

    // Definimos las unidades posibles
    const units = ["µCores", "mCores", "Cores"];
    let value: number;
    let unit: string;

    if (cores < 0.001) {
      // Convertir a Microcores (µCores)
      value = cores * 1e6;
      unit = units[0];
    } else if (cores < 1) {
      // Convertir a Milicores (mCores)
      value = cores * 1000;
      unit = units[1];
    } else {
      // Mostrar en Cores completos
      value = cores;
      unit = units[2];
    }

    return {
      value: value.toFixed(2),
      unit,
    };
  };

  // Función para aproximar el valor como porcentaje
  const approximateToPercentage = (num: number) => {
    // Redondeamos según el valor del número
    return (num * 100).toFixed(2); // Si es menor que 1%, lo mostramos como entero
  };

  return (
    <div className={twMerge(className, "")} {...props}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="CPU Usage"
                  value={formatCores(cpuUsage).value}
                  suffix={formatCores(cpuUsage).unit}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Memory Usage"
                  value={formatBytes(memUsage).value}
                  suffix={formatBytes(memUsage).unit}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="CPU Limit"
                  value={formatCores(cpuLimit).value}
                  suffix={formatCores(cpuLimit).unit}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Memory Limit"
                  value={formatBytes(memLimit).value}
                  suffix={formatBytes(memLimit).unit}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col span={12}>
              <Card>
                <Row justify={"center"} gutter={[4, 4]}>
                  <Col span={24}>
                    <Text type="secondary">CPU Load</Text>
                  </Col>
                  <Col span={24}>
                    <Row justify={"center"}>
                      <Progress
                        type="dashboard"
                        percent={Number(
                          approximateToPercentage(nfLoad.cpuLoad),
                        )}
                        strokeWidth={10}
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
                    <Text type="secondary">Memory Load</Text>
                  </Col>
                  <Col span={24}>
                    <Row justify={"center"}>
                      <Progress
                        type="dashboard"
                        percent={Number(
                          approximateToPercentage(nfLoad.memLoad),
                        )}
                        strokeWidth={10}
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
    </div>
  );
};

type NfInfoStatisticComponentProps = ComponentProps<"div"> & {
  cpuUsage: number;
  memUsage: number;
  cpuLimit: number;
  memLimit: number;
  nfLoad: NfLoad;
};

export default NfInfoStatisticComponent;

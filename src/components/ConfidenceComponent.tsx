import { Card, Col, Row, Statistic, Empty } from "antd";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Confidence } from "../models/api";

const ConfidenceComponent = ({
  className,
  mse,
  r2,
  mseCpu,
  r2Cpu,
  mseMem,
  r2Mem,
  mseThrpt,
  r2Thrpt,
  ...props
}: ConfidenceComponentProps) => {
  const statistics = [
    { title: "Average RMSE", value:  Math.sqrt(parseFloat(mse?.toExponential(3))) },
    { title: "Average R²", value: r2?.toFixed(3) },
    { title: "CPU RMSE", value: Math.sqrt(parseFloat(mseCpu?.toExponential(3))) },
    { title: "CPU R²", value: r2Cpu?.toFixed(3) },
    { title: "Memory RMSE", value: Math.sqrt(parseFloat(mseMem?.toExponential(3))) },
    { title: "Memory R²", value: r2Mem?.toFixed(3) },
    { title: "Throughput RMSE", value: Math.sqrt(parseFloat(mseThrpt?.toExponential(3))) },
    { title: "Throughput R²", value: r2Thrpt?.toFixed(3) },
  ];

  // Validamos si hay datos disponibles
  const hasData = statistics.some((stat) => stat.value !== undefined);

  return (
    <div className={twMerge(className, "width-full")} {...props}>
      <Col span={24}>
        {hasData ? (
          <Row gutter={[8, 8]}>
            {statistics.map((stat, index) => (
              <Col span={12} key={index}>
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value || "N/A"} // Valor por defecto si falta un dato específico
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No data available" className="my-4" />
        )}
      </Col>
    </div>
  );
};

type ConfidenceComponentProps = ComponentProps<"div"> & Confidence;

export default ConfidenceComponent;

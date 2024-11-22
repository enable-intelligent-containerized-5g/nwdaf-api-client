import { Card, Col, Row, Statistic } from "antd";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const ConfidenceComponent = ({
  className,
  mse,
  r2,
  mseCpu,
  r2Cpu,
  mseMem,
  r2Mem,
  ...props
}: ConfidenceComponentProps) => {
  return (
    <div className={twMerge(className, "")} {...props}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Card>
                  <Statistic title="Average MSE" value={mse.toExponential(3)} />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic title="Average R²" value={r2.toFixed(3)} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Card>
                  <Statistic title="CPU MSE" value={mseCpu.toExponential(3)} />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic title="CPU R²" value={r2Cpu.toFixed(3)} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Memory MSE"
                    value={mseMem.toExponential(3)}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic title="Memory R²" value={r2Mem.toFixed(3)} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

type ConfidenceComponentProps = ComponentProps<"div"> & {
  mse: number;
  r2: number;
  mseCpu: number;
  r2Cpu: number;
  mseMem: number;
  r2Mem: number;
};

export default ConfidenceComponent;

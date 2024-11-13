import React from "react";
import { Button, Col, Form, Layout, Radio, Row, theme, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useTypeInfoFilter } from "./hooks/useTypeInfoFilter";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const { Text } = Typography;
const { Header, Content } = Layout;
type FormData = {
  eventId: string;
  startTime: Date;
  endTime: Date;
  nfTypes?: string[];
  nfInstances?: string[];
  accuracy?: string;
};

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { options } = useTypeInfoFilter();

  const Schema = yup.object().shape({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(Schema),
  });

  const onFinish = (fieldsValue: FormData) => {
    console.log(fieldsValue);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Layout>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button type="text">
              <Title>Intelligent 5G</Title>
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Row gutter={[16, 8]}>
              <Col flex={2}>
                <Form onFinish={onFinish}>
                  <Row>
                    <Col flex={"auto"}>
                      <Text type="secondary">Analysis Metrics</Text>
                      <Form.Item name="TypeInfoFilter">
                        <Radio.Group
                          block
                          options={options}
                          buttonStyle="solid"
                          optionType="button"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col flex={"auto"}>
                      <Text type="secondary">Filter information</Text>
                      <Form.Item name="TypeInfoFilter">
                        <Radio.Group
                          block
                          options={options}
                          buttonStyle="solid"
                          optionType="button"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col flex={6}>Grafico</Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;

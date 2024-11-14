import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Layout,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  theme,
} from "antd";
import Title from "antd/es/typography/Title";
import { useTypeInfoFilter } from "./hooks/useTypeInfoFilter";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useAnalisysMetric } from "./hooks/useAnalisysMetric";
import { useNfType } from "./hooks/useNfType";
import TextArea from "antd/es/input/TextArea";
import { useAnalysisTime } from "./hooks/useAnalysisTime";
import { useDefaultTime } from "./hooks/useDefaultTime";
import { useAccuracyLevel } from "./hooks/useAccuracyLevel";
import { AnalysisInfoRequestData } from "./models/api";
import { analyticsInfoRequest } from "./http/analysisInfo/analysisInfo.service";

const { Header, Content } = Layout;

const schema = yup.object().shape({
  analysisMetrics: yup.string().required("This field is required"),
  typeInfoFilter: yup.string().required("This field is required"),
  nfTypes: yup.array().of(yup.string()).notRequired(),
  nfInstances: yup.array().of(yup.string()).notRequired(),
  analysisTime: yup.string().required("This field is required"),
  defaultTime: yup.number().required("This field is required"),
  startTime: yup.string(),
  endTime: yup.string(),
  accuracy: yup.string().required("This field is required"),
});

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [validationSchema, setValidationSchema] = useState(schema);
  const { optionsTypeInfoFilters } = useTypeInfoFilter();
  const { optionsAnalysisMetrics } = useAnalisysMetric();
  const { optionsNfTypes } = useNfType();
  const { optionsAnalysisTime } = useAnalysisTime();
  const { optionsDefaultTime } = useDefaultTime();
  const { optionsAccuracyLevels } = useAccuracyLevel();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onFinish = async ({
    analysisMetrics,
    typeInfoFilter,
    nfTypes,
    nfInstances,
    analysisTime,
    defaultTime,
    accuracy,
  }: AnalysisMetricsForm) => {
    let startTime = "";
    let endTime = "";
    const currentTime = new Date();
    const pastTime = new Date(currentTime.getTime() - defaultTime * 60000);

    const valueTimeFormatted = pastTime.toISOString();

    const currentTimeFormatted = currentTime.toISOString();

    if (analysisTime === "statistic") {
      startTime = valueTimeFormatted;
      endTime = currentTimeFormatted;
    } else {
      startTime = currentTimeFormatted;
      endTime = valueTimeFormatted;
    }

    const analysisInfoRequestData: AnalysisInfoRequestData = {
      eventId: analysisMetrics,
      startTime,
      endTime,
      accuracy,
      ...(typeInfoFilter === "nfType" && nfTypes ? { nfTypes } : {}),
      ...(typeInfoFilter === "nfInstanceId" && nfInstances
        ? { nfInstances }
        : {}),
    };
    analyticsInfoRequest(analysisInfoRequestData).then((response) => {
      console.log(response);
    });
  };

  const typeInfoFilterValue = watch("typeInfoFilter");

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
              <Col xs={24} sm={24} md={8} xl={6}>
                <Form
                  form={form}
                  onFinish={handleSubmit(onFinish)}
                  layout="vertical"
                >
                  {/* Analysis Metrics Field */}
                  <Row>
                    <Col flex={"auto"}>
                      <Form.Item
                        label="Analysis metrics"
                        validateStatus={errors.analysisMetrics ? "error" : ""}
                        help={errors.analysisMetrics?.message}
                      >
                        <Controller
                          name="analysisMetrics"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={optionsAnalysisMetrics}
                              placeholder="Select one"
                              allowClear
                            ></Select>
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Type Info Filter Field */}
                  <Row>
                    <Col flex={"auto"}>
                      <Form.Item
                        label="Filter information"
                        validateStatus={errors.typeInfoFilter ? "error" : ""}
                        help={errors.typeInfoFilter?.message}
                      >
                        <Controller
                          name="typeInfoFilter"
                          control={control}
                          render={({ field }) => {
                            const handleChange = (e: RadioChangeEvent) => {
                              const value = e.target.value;
                              console.log(value);
                              let newSchema = schema;
                              if (value === "nfType") {
                                newSchema = schema.shape({
                                  nfTypes: yup
                                    .array()
                                    .of(yup.string())
                                    .min(1, "NF Types is required")
                                    .required("NF Types is required"),
                                });
                                setValue("nfInstances", []);
                              }
                              if (value === "nfInstanceId") {
                                newSchema = schema.shape({
                                  nfInstances: yup
                                    .array()
                                    .of(yup.string())
                                    .min(1, "NF Instances is required")
                                    .required("NF Instances is required"),
                                });
                                setValue("nfTypes", []);
                              }

                              setValidationSchema(newSchema);
                              field.onChange(value);
                            };
                            return (
                              <Radio.Group
                                {...field}
                                options={optionsTypeInfoFilters}
                                buttonStyle="solid"
                                optionType="button"
                                onChange={handleChange}
                              />
                            );
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col flex={"auto"}>
                      {/* NF Types Field*/}
                      {typeInfoFilterValue === "nfType" && (
                        <Form.Item
                          label="NF Types"
                          validateStatus={errors.nfTypes ? "error" : ""}
                          help={errors.nfTypes?.message}
                        >
                          <Controller
                            name="nfTypes"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={optionsNfTypes}
                                placeholder="Select multiple"
                                mode="multiple"
                                allowClear
                              ></Select>
                            )}
                          />
                        </Form.Item>
                      )}
                      {/* NF Instances Field */}
                      {typeInfoFilterValue === "nfInstanceId" && (
                        <Form.Item
                          label="NF Instances"
                          validateStatus={errors.nfInstances ? "error" : ""}
                          help={errors.nfInstances?.message}
                        >
                          <Controller
                            name="nfInstances"
                            control={control}
                            render={({ field }) => {
                              const handleChange = (e) => {
                                const value = e.target.value;
                                const nfInstances = value.split(",");
                                field.onChange(nfInstances);
                              };
                              return (
                                <TextArea
                                  {...field}
                                  value={field.value?.join(",")}
                                  placeholder="Each NF Instance separated by comma"
                                  onChange={handleChange}
                                />
                              );
                            }}
                          />
                        </Form.Item>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col flex={"auto"}>
                      <Form.Item
                        label="Time of analysis"
                        validateStatus={errors.analysisTime ? "error" : ""}
                        help={errors.analysisTime?.message}
                      >
                        <Controller
                          name="analysisTime"
                          control={control}
                          render={({ field }) => {
                            const handleChange = (e) => {
                              const value = e.target.value;
                              setValue("defaultTime", 0);
                              setValue("startTime", "");
                              setValue("endTime", "");

                              field.onChange(value);
                            };

                            return (
                              <Radio.Group
                                {...field}
                                options={optionsAnalysisTime}
                                buttonStyle="solid"
                                optionType="button"
                                onChange={handleChange}
                              />
                            );
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col flex={"auto"}>
                      <Form.Item
                        label="Time of analysis"
                        validateStatus={errors.defaultTime ? "error" : ""}
                        help={errors.defaultTime?.message}
                      >
                        <Controller
                          name="defaultTime"
                          control={control}
                          render={({ field }) => {
                            const handleChange = (e) => {
                              const value = e.target.value;
                              field.onChange(value);
                            };

                            return (
                              <Radio.Group
                                {...field}
                                options={optionsDefaultTime}
                                buttonStyle="solid"
                                optionType="button"
                                onChange={handleChange}
                              />
                            );
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col flex={"auto"}>
                      <Form.Item
                        label="Accuracy levels"
                        validateStatus={errors.accuracy ? "error" : ""}
                        help={errors.accuracy?.message}
                      >
                        <Controller
                          name="accuracy"
                          control={control}
                          render={({ field }) => (
                            <Radio.Group
                              {...field}
                              options={optionsAccuracyLevels}
                              buttonStyle="solid"
                              optionType="button"
                            />
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col flex={"auto"}>
                      <Button type="primary" htmlType="submit">
                        Enviar consulta
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col flex={6}>{JSON.stringify(getValues(), null, 2)}</Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

interface AnalysisMetricsForm {
  analysisMetrics: string;
  typeInfoFilter: string;
  nfTypes: string[];
  nfInstances: string[];
  analysisTime: string;
  defaultTime: number;
  startTime: string;
  endTime: string;
  accuracy: string;
}

export default App;

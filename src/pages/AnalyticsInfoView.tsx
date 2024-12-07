import {
  Button,
  Col,
  Descriptions,
  Empty,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tabs,
  Typography,
  Form,
  Spin,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { useTypeInfoFilter } from "../hooks/useTypeInfoFilter";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAnalisysMetric } from "../hooks/useAnalisysMetric";
import { useNfType } from "../hooks/useNfType";
import TextArea from "antd/es/input/TextArea";
import { useAnalysisTime } from "../hooks/useAnalysisTime";
import { useDefaultTime } from "../hooks/useDefaultTime";
import { useAccuracyLevel } from "../hooks/useAccuracyLevel";
import {
  AnalyticsNfLoad,
  AnalysisInfoRequestData,
  AnalysisInfoResponseData,
} from "../models/api";
import { analyticsInfoRequest } from "../http/analysis_info/analysis_info.service";
import AnalyticsInfoResponseDataView from "../components/AnalyticsInfoResponseDataView";
import Title from "antd/es/typography/Title";
import * as yup from "yup";
import { DescriptionsItemType } from "antd/es/descriptions";
import { ChangeEvent, useState } from "react";

const schema = yup.object().shape({
  analysisMetrics: yup.string().required("This field is required"),
  typeInfoFilter: yup.string().required("This field is required"),
  nfTypes: yup.array().of(yup.string()).notRequired(),
  nfInstances: yup.array().of(yup.string()).notRequired(),
  analysisTime: yup.string().required("This field is required"),
  defaultTime: yup
    .number()
    .required("This field is required")
    .min(1, "This field is required"),
  startTime: yup.string(),
  endTime: yup.string(),
  accuracy: yup.string(),
});

const { Item } = Form;
const { Text } = Typography;

const AnalyticsInfoView = () => {
  const [form] = Form.useForm();
  const [validationSchema, setValidationSchema] = useState(schema);
  const { optionsTypeInfoFilters } = useTypeInfoFilter();
  const { optionsAnalysisMetrics } = useAnalisysMetric();
  const { optionsNfTypes } = useNfType();
  const { optionsAnalysisTime } = useAnalysisTime();
  const { optionsDefaultTime } = useDefaultTime();
  const { optionsAccuracyLevels } = useAccuracyLevel();
  const [analysisInfoResponseData, setAnalysisInfoResponseData] =
    useState<AnalysisInfoResponseData>({} as AnalysisInfoResponseData);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [showAccuracyLevel, setShowAccuracyLevel] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onFinish = async (analysisMetricsForm: object) => {
    setLoading(true);
    const {
      analysisMetrics,
      typeInfoFilter,
      nfTypes,
      nfInstances,
      analysisTime,
      defaultTime,
      accuracy,
    } = analysisMetricsForm as AnalysisMetricsForm;
    let startTime = "";
    let endTime = "";
    const currentTime = new Date();

    if (analysisTime === "statistic") {
      const pastTime = new Date(currentTime.getTime() - defaultTime * 1000);
      const valueTimeFormatted = pastTime.toISOString();
      const currentTimeFormatted = currentTime.toISOString();
      startTime = valueTimeFormatted;
      endTime = currentTimeFormatted;
    } else {
      const futureTime = new Date(currentTime.getTime() + defaultTime * 1000);
      const valueTimeFormatted = futureTime.toISOString();
      const currentTimeFormatted = currentTime.toISOString();
      startTime = currentTimeFormatted;
      endTime = valueTimeFormatted;
    }

    // Aseguramos que nfTypes y nfInstances sean siempre un arreglo de strings
    const validNfTypes = nfTypes
      ? nfTypes.filter((type): type is string => type !== undefined)
      : [];
    const validNfInstances = nfInstances
      ? nfInstances.filter(
          (instance): instance is string => instance !== undefined,
        )
      : [];

    const analysisInfoRequestData: AnalysisInfoRequestData = {
      eventId: analysisMetrics,
      startTime,
      endTime,
      accuracy,
      ...(typeInfoFilter === "nfType" && validNfTypes.length > 0
        ? { nfTypes: validNfTypes }
        : {}),
      ...(typeInfoFilter === "nfInstanceId" && validNfInstances.length > 0
        ? { nfInstances: validNfInstances }
        : {}),
    };

    analyticsInfoRequest(analysisInfoRequestData)
      .then((response: AnalysisInfoResponseData) => {
        setAnalysisInfoResponseData(response);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        messageApi.error(`${error}`);
      });
  };

  const typeInfoFilterValue = watch("typeInfoFilter");

  return (
    <div className="h-full">
      {contextHolder}
      <Row gutter={[8, 8]}>
        <Col className="overflow-auto" xs={24} sm={24} md={8} xl={6}>
          <Form form={form} onFinish={handleSubmit(onFinish)} layout="vertical">
            {/* Analysis Metrics Field */}
            <Row>
              <Col flex={"auto"}>
                <Item
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
                </Item>
              </Col>
            </Row>

            {/* Type Info Filter Field */}
            <Row>
              <Col flex={"auto"}>
                <Item
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
                </Item>
              </Col>
            </Row>

            <Row>
              <Col flex={"auto"}>
                {/* NF Types Field*/}
                {typeInfoFilterValue === "nfType" && (
                  <Item
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
                  </Item>
                )}
                {/* NF Instances Field */}
                {typeInfoFilterValue === "nfInstanceId" && (
                  <Item
                    label="NF Instances"
                    validateStatus={errors.nfInstances ? "error" : ""}
                    help={errors.nfInstances?.message}
                  >
                    <Controller
                      name="nfInstances"
                      control={control}
                      render={({ field }) => {
                        const handleChange = (
                          e: ChangeEvent<HTMLTextAreaElement>,
                        ) => {
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
                  </Item>
                )}
              </Col>
            </Row>

            <Row>
              <Col flex={"auto"}>
                <Item
                  label="Analysis type"
                  validateStatus={errors.analysisTime ? "error" : ""}
                  help={errors.analysisTime?.message}
                >
                  <Controller
                    name="analysisTime"
                    control={control}
                    render={({ field }) => {
                      const handleChange = (e: RadioChangeEvent) => {
                        const value = e.target.value;
                        setValue("defaultTime", 0);
                        setValue("startTime", "");
                        setValue("endTime", "");

                        setShowAccuracyLevel(value === "prediction");
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
                </Item>
              </Col>
            </Row>

            <Row>
              <Col flex={"auto"}>
                <Item
                  label="Target period"
                  validateStatus={errors.defaultTime ? "error" : ""}
                  help={errors.defaultTime?.message}
                >
                  <Controller
                    name="defaultTime"
                    control={control}
                    render={({ field }) => {
                      const handleChange = (e: RadioChangeEvent) => {
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
                </Item>
              </Col>
            </Row>

            <Row>
              {showAccuracyLevel && (
                <Col flex={"auto"}>
                  <Item
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
                  </Item>
                </Col>
              )}
            </Row>

            <Row>
              <Col flex={"auto"}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={16} xl={18}>
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center z-10 bg-opacity-50 bg-white">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
              </div>
            )}

            {analysisInfoResponseData.eventId ? (
              <Row gutter={[16, 16]}>
                <Col>
                  <Title level={1}>{analysisInfoResponseData.eventId}</Title>
                  <Descriptions
                    items={descriptionItemsInit.map(({ key, label }) => {
                      let value =
                        analysisInfoResponseData[
                          label as keyof AnalysisInfoResponseData
                        ];

                      if (label === "targetPeriod") {
                        value = Number(value) / 60 + "m";
                      }

                      // Si value es un objeto NfLoad, convertimos a algo que sea renderizable
                      const children =
                        value &&
                        typeof value === "object" &&
                        "cpuLimit" in value
                          ? `${value.cpuLimit} (CPU Limit)` // Ejemplo de cómo renderizar parte de NfLoad
                          : value !== undefined
                            ? value
                            : "N/A"; // Valor predeterminado si no existe

                      return {
                        key,
                        label,
                        children,
                      } as DescriptionsItemType;
                    })}
                  />
                </Col>
                <Col>
                  <Tabs
                    tabPosition="top"
                    type="card"
                    items={analysisInfoResponseData.analiticsNfLoad?.map(
                      (analyticsNfLoad: AnalyticsNfLoad) => {
                        const { container, nfInstanceId } = analyticsNfLoad;

                        return {
                          label: container,
                          key: nfInstanceId,
                          children: (
                            <AnalyticsInfoResponseDataView
                              analyticsInfo={analyticsNfLoad}
                            />
                          ),
                        };
                      },
                    )}
                  />
                </Col>
              </Row>
            ) : (
              // Mostrar mensaje vacío si no hay eventId
              <Empty
                imageStyle={{ height: 160 }}
                description={<Text>No data to analyze</Text>}
              />
            )}
          </div>
        </Col>
      </Row>
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

const descriptionItemsInit: DescriptionsItemType[] = [
  {
    key: "1",
    label: "analysisType",
    children: "value",
  },
  {
    key: "2",
    label: "targetPeriod",
    children: "value",
  },
];

export default AnalyticsInfoView;

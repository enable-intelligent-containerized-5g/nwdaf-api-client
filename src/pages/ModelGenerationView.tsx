import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Spin,
  TimePicker,
  Typography,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { useAnalisysMetric } from "../hooks/useAnalisysMetric";
import { useNfType } from "../hooks/useNfType";
import { useDefaultTime } from "../hooks/useDefaultTime";
import { Controller, useForm } from "react-hook-form";
import {
  MlModelTrainingRequestData,
  MlModelTrainingResponseData,
} from "../models/api";
import { mlModelTrainingRequest } from "../http/ml_model_training/ml_model_training";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import MlModelTrainingResponseDataView from "../components/MlModelTrainingResponseDataView";

const schema = yup.object().shape({
  eventId: yup.string().required("This field is required"),
  nfType: yup.string().required("This field is required"),
  startTime: yup.string().required("This field is required"),
  targetPeriod: yup.number().required("This field is required"),
  newDataset: yup.boolean().required("This field is required"),
});

const { Item } = Form;
const { Text } = Typography;

const ModelGenerationView = () => {
  const [form] = Form.useForm();
  const [validationSchema] = useState(schema);
  const { optionsAnalysisMetrics } = useAnalisysMetric();
  const { optionsNfTypes } = useNfType();
  const { optionsDefaultTime } = useDefaultTime();
  const [mlModelTrainingResponseData, setMlModelTrainingResponseData] =
    useState<MlModelTrainingResponseData>({} as MlModelTrainingResponseData);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onFinish = async (mlModelTrainingForm: object) => {
    setLoading(true);
    const { eventId, nfType, targetPeriod, newDataset, startTime } =
      mlModelTrainingForm as MlModelTrainingForm;
    const mlModelTrainingResquestData: MlModelTrainingRequestData = {
      nfType,
      eventId,
      targetPeriod,
      startTime,
      newDataset,
    };

    mlModelTrainingRequest(mlModelTrainingResquestData)
      .then((response: MlModelTrainingResponseData) => {
        setMlModelTrainingResponseData(response);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        const { detail: message } = error.response.data;
        messageApi.error(`Error to analysis NFs: ${message}`);
      });
  };

  return (
    <div className="h-full">
      {contextHolder}
      <Row gutter={[8, 8]}>
        <Col
          className="min-h-[450px] overflow-auto"
          xs={24}
          sm={24}
          md={8}
          xl={6}
        >
          <Form form={form} onFinish={handleSubmit(onFinish)} layout="vertical">
            <Row>
              <Col flex={"auto"}>
                <Item
                  label="Analysis metrics"
                  validateStatus={errors.eventId ? "error" : ""}
                  help={errors.eventId?.message}
                >
                  <Controller
                    name="eventId"
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

            <Row>
              <Col flex={"auto"}>
                <Item
                  label="NF Type"
                  validateStatus={errors.nfType ? "error" : ""}
                  help={errors.nfType?.message}
                >
                  <Controller
                    name="nfType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsNfTypes}
                        placeholder="Select multiple"
                        allowClear
                      ></Select>
                    )}
                  />
                </Item>
              </Col>
            </Row>

            <Row>
              <Col flex={"auto"}>
                <Item
                  label="Target period"
                  validateStatus={errors.targetPeriod ? "error" : ""}
                  help={errors.targetPeriod?.message}
                >
                  <Controller
                    name="targetPeriod"
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
              <Col flex={"auto"}>
                <Item
                  label="Start Time"
                  validateStatus={errors.startTime ? "error" : ""}
                  help={errors.startTime?.message}
                >
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <Space>
                        <DatePicker
                          onChange={(date) => {
                            const time = field.value
                              ? new Date(field.value)
                              : new Date();
                            const combinedDate = new Date(
                              date.year(),
                              date.month(),
                              date.date(),
                              time.getHours(),
                              time.getMinutes(),
                            );
                            const isoString = combinedDate.toISOString();
                            field.onChange(isoString);
                          }}
                        />
                        <TimePicker
                          onChange={(time) => {
                            if (time) {
                              const date = field.value
                                ? new Date(field.value)
                                : new Date();
                              const combinedDate = new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate(),
                                time.hour(),
                                time.minute(),
                              );
                              const isoString = combinedDate.toISOString();
                              field.onChange(isoString);
                            }
                          }}
                        />
                      </Space>
                    )}
                  />
                </Item>
              </Col>
            </Row>

            <Row>
              <Col flex={"auto"}>
                <Item
                  label="New dataset"
                  validateStatus={errors.newDataset ? "error" : ""}
                  help={errors.newDataset?.message}
                >
                  <Controller
                    name="newDataset"
                    control={control}
                    render={({ field }) => (
                      <Radio.Group
                        {...field}
                        buttonStyle="solid"
                        optionType="button"
                      >
                        <Radio value="true">Yes</Radio>
                        <Radio value="false">No</Radio>
                      </Radio.Group>
                    )}
                  />
                </Item>
              </Col>
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

            {mlModelTrainingResponseData.name ? (
              <Row gutter={[16, 16]}>
                <Col>
                  <MlModelTrainingResponseDataView
                    mlModelTraining={mlModelTrainingResponseData}
                  />
                </Col>
              </Row>
            ) : (
              <Empty
                imageStyle={{ height: 160 }}
                description={<Text>No data to training</Text>}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

interface MlModelTrainingForm {
  eventId: string;
  nfType: string;
  targetPeriod: string;
  startTime: string;
  newDataset: boolean;
}

export default ModelGenerationView;

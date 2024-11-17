import {
  Button,
  Col,
  Empty,
  Form,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Typography,
} from "antd";
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
  startTime: yup.string(),
  targetPeriod: yup.string().required("This field is required"),
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onFinish = async (mlModelTrainingForm: object) => {
    const { eventId, nfType, targetPeriod, newDataset } =
      mlModelTrainingForm as MlModelTrainingForm;
    const currentTime = new Date();

    const startTimeFormatted = currentTime.toISOString();

    const mlModelTrainingResquestData: MlModelTrainingRequestData = {
      nfType,
      eventId,
      targetPeriod,
      startTime: startTimeFormatted,
      newDataset,
    };

    mlModelTrainingRequest(mlModelTrainingResquestData).then(
      (response: MlModelTrainingResponseData) => {
        setMlModelTrainingResponseData(response);
      },
    );
  };

  return (
    <div className="h-full">
      <Row>
        <Col className="h-[450px] overflow-auto" xs={24} sm={24} md={8} xl={6}>
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
                  label="Time of analysis"
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
                  Enviar consulta
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={16} xl={18}>
          {mlModelTrainingResponseData.name && (
            <Row gutter={[16, 16]}>
              <Col>
                <MlModelTrainingResponseDataView
                  mlModelTraining={mlModelTrainingResponseData}
                />
              </Col>
            </Row>
          )}
          {!mlModelTrainingResponseData.name && (
            <div className="h-full w-full flex justify-center items-center">
              <Empty
                imageStyle={{ height: 160 }}
                description={<Text>No data to analyze</Text>}
              />
            </div>
          )}
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

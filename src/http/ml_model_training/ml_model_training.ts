import {
  MlModelTrainingRequestData,
  MlModelTrainingResponseData,
} from "../../models/api";
import ApiService from "../apiService";

const host = "http://localhost:30081";
const path = "nnwdaf-mlmodeltraining/v1";

async function mlModelTrainingRequest(payload: MlModelTrainingRequestData) {
  try {
    const response = await ApiService({
      endpoint: `${host}/${path}/mlmodeltraining/request`,
      method: "POST",
      data: payload,
    });
    return response.data as MlModelTrainingResponseData;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

export { mlModelTrainingRequest };

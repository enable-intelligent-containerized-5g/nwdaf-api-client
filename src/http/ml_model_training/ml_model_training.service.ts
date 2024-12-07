import {
  MlModelTrainingRequestData,
  MlModelTrainingResponseData,
} from "../../models/api";
import ApiService from "../apiService";
import { loadConfig } from "../getConfig";

let host = "http://localhost:30081";
const path = "nnwdaf-mlmodeltraining/v1";

async function mlModelTrainingRequest(payload: MlModelTrainingRequestData) {
  try {
    const config = await loadConfig();
    if (config?.nwdafMtlfUri) {
      host = config.nwdafMtlfUri;
    } else {
      console.error("No found MTLF URI in configuration file");
    }

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

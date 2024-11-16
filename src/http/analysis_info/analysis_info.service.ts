import {
  AnalysisInfoRequestData,
  AnalysisInfoResponseData,
} from "../../models/api";
import ApiService from "../apiService";

const host = "http://localhost:30080";
const path = "nnwdaf-analyticsinfo/v1";

async function analyticsInfoRequest(payload: AnalysisInfoRequestData) {
  try {
    const response = await ApiService({
      endpoint: `${host}/${path}/analyticsinfo/request`,
      method: "POST",
      data: payload,
    });
    return response.data as AnalysisInfoResponseData;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

export { analyticsInfoRequest };

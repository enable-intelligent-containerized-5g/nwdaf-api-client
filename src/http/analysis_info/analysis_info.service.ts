import {
  AnalysisInfoRequestData,
  AnalysisInfoResponseData,
} from "../../models/api";
import ApiService from "../apiService";
import { loadConfig } from "../getConfig";

let host = "http://127.0.0.1:30080";
const path = "nnwdaf-analyticsinfo/v1";

async function analyticsInfoRequest(payload: AnalysisInfoRequestData) {
  try {
    const config = await loadConfig();
    if (config?.nwdafAnlfUri) {
      host = config.nwdafAnlfUri;
    } else {
      console.error("No found AnLF URI in configuration file");
    }

    const response = await ApiService({
      endpoint: `${host}/${path}/analyticsinfo/request`,
      method: "POST",
      data: payload,
    });
    return response.data as AnalysisInfoResponseData;
  } catch (error) {
    // console.error("Error in the request:", error);
    throw error;
  }
}

export { analyticsInfoRequest };

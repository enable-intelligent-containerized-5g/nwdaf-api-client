import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const DEFAULT_BASE_URL = "http://127.0.0.1:30080";

interface ApiServiceOptions<T> {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  token?: string;
  baseURL?: string;
}

// axios.defaults.crossdomain = true;

// Función de servicio API genérica que recibe y devuelve tipos
async function ApiService<T = unknown, R = unknown>({
  endpoint,
  method = "GET",
  data,
  token,
  baseURL = DEFAULT_BASE_URL,
}: ApiServiceOptions<T>): Promise<AxiosResponse<R>> {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    data,
  };

  // axios.defaults.crossdomain = true;

  try {
    const response = await axios.request<R>(config);
    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}

export default ApiService;

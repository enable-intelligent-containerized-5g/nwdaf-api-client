import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const DEFAULT_BASE_URL = "http://127.0.0.1:30080";

interface ApiServiceOptions<T> {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  token?: string;
  baseURL?: string;
  headers?: Record<string, string>;
}

// axios.defaults.crossdomain = true;

// Función de servicio API genérica que recibe y devuelve tipos
async function ApiService<T = unknown, R = unknown>({
  endpoint,
  method = "GET",
  data,
  token,
  baseURL = DEFAULT_BASE_URL,
  headers = {},
}: ApiServiceOptions<T>): Promise<AxiosResponse<R>> {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    data,
  };

  // axios.defaults.crossdomain = true;

  try {
    const response = await axios.request<R>(config);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Customization for network errors
      if (!error.response) {
        // Handling "Network Error" when there is no response from the server
        console.error("(Network Error) Please check your internet connection.");
        throw new Error(
          "(Network Error) Please check your internet connection.",
        );
      } else {
        // Handling other server errors with a response (e.g., 404, 500)
        console.error("Server response error:", error.response);
        throw new Error(`${error.response?.data?.message || error.message}`);
      }
    } else {
      // If it's not an AxiosError, we just throw the error as is
      console.error("Unknown error:", error);
      throw error;
    }
  }
}

export default ApiService;

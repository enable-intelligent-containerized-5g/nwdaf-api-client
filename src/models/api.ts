// src/models/api.ts

// Tipos para los datos que envías al endpoint
export interface ApiRequestBody {
  key: string;
}

// Tipos para la respuesta del endpoint
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any; // Puedes cambiar 'any' por el tipo específico de los datos que recibes.
}

// Tipos para manejar errores en la respuesta
export interface ApiError {
  error: string;
  status: number;
}

export interface Options {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TypeInfoFilter {
  id_type_info: number;
  name: string;
  code: string;
}

export interface AnalysisMetric {
  id_analysis_metric: number;
  name: string;
  code: string;
  disabled: boolean;
}

// src/models/api.ts

// Tipos para los datos que envías al endpoint
export interface ApiRequestBody {
  key: string;
}

// Tipos para la respuesta del endpoint
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: object; // Puedes cambiar 'any' por el tipo específico de los datos que recibes.
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

export interface AnalysisTime {
  id_analysis_time: number;
  name: string;
  code: string;
}

export interface DefaultTime {
  id_default_time: number;
  name: string;
  code: string;
}

export interface AccuracyLevel {
  id_accuracy_level: number;
  name: string;
  code: string;
}

export interface AnalysisInfoRequestData {
  eventId: string;
  startTime: string;
  endTime: string;
  nfTypes?: string[] | null;
  nfInstances?: string[] | null;
  accuracy?: string;
}

export interface NfLoad {
  cpuLoad: number;
  memLoad: number;
}

export interface AnalyticsNfLoad {
  container: string;
  pod: string;
  nfInstanceId: string;
  nfType: string;
  nfStatus: string;
  cpuLimit: number;
  cpuUsage: number;
  memLimit: number;
  memUsage: number;
  throughput: number;
  nfLoad: NfLoad;
  confidence: Confidence;
}

export interface AnalysisInfoResponseData {
  analiticsNfLoad: AnalyticsNfLoad[];
  analysisType: "Statistics" | "Prediction";
  eventId: string;
  offSet: number;
  targetPeriod: number;
}

export interface MlModelTrainingRequestData {
  eventId: string;
  nfType: string | null;
  startTime: string;
  targetPeriod: string;
  newDataset: boolean;
  file: { data: string | null; name: string | null } | null;
}

export interface MlModelTrainingResponseData {
  name: string;
  size: number;
  eventId: string;
  targetPeriod: number;
  confidence: Confidence;
  accuracy: string;
  nfType: string;
  figure: string;
}

export interface Confidence {
  mse: number;
  r2: number;
  mseCpu: number;
  r2Cpu: number;
  mseMem: number;
  r2Mem: number;
  mseThrpt: number;
  r2Thrpt: number;
}

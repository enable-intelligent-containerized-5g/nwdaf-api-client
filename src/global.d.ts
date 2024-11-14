import {
  AccuracyLevel,
  AnalysisMetric,
  AnalysisTime,
  DefaultTime,
  TypeInfoFilter,
} from "./models/api";
import rawData from "./data.json";

export const typedData: {
  type_info_filters: TypeInfoFilter[];
  analysis_metrics: AnalysisMetric[];
  nf_types: string[];
  analysis_times: AnalysisTime[];
  default_times: DefaultTime[];
  accuracy_levels: AccuracyLevel[];
} = rawData;
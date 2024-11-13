import { AnalysisMetric, TypeInfoFilter } from "./models/api";

declare module "*.json" {
  const typedData: {
    type_info_filters: TypeInfoFilter[];
    analysis_metrics: AnalysisMetric[];
  };
  export default typedData;
}

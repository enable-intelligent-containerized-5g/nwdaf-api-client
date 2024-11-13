import { useEffect } from "react";
import { AnalysisMetric, Options } from "../models/api";
import data from "../data.json";

const { analysis_metrics } = data as { analysis_metrics: AnalysisMetric[] };

export const useAnalisysMetric = () => {
  const [analysisMetrics, setAnalysisMetrics] = useState<AnalysisMetric[]>([]);
  const [options, setOptions] = useState<Options[]>([]);

  useEffect(() => {
    setAnalysisMetrics(analysis_metrics);
  });
};

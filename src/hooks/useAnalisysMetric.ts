import { useEffect, useState } from "react";
import { AnalysisMetric, Options } from "../models/api";
import { typedData } from "../global.d";

export const useAnalisysMetric = () => {
  const { analysis_metrics } = typedData;
  const [analysisMetrics, setAnalysisMetrics] = useState<AnalysisMetric[]>([]);
  const [optionsAnalysisMetrics, setOptionsAnalysisMetrics] = useState<
    Options[]
  >([]);

  useEffect(() => {
    setAnalysisMetrics(analysis_metrics);
  }, [analysis_metrics]);

  useEffect(() => {
    const analysisMetricsOptions = analysisMetrics.map((analysisMetric) => ({
      label: analysisMetric.name,
      value: analysisMetric.code,
      disabled: analysisMetric.disabled,
    }));
    setOptionsAnalysisMetrics(analysisMetricsOptions);
  }, [analysisMetrics]);

  return {
    optionsAnalysisMetrics,
  };
};

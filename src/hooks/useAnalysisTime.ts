import { useEffect, useState } from "react";
import { typedData } from "../global.d";
import { AnalysisTime, Options } from "../models/api";

export const useAnalysisTime = () => {
  const { analysis_times } = typedData;
  const [analysisTime, setAnalysisTime] = useState<AnalysisTime[]>([]);
  const [optionsAnalysisTime, setOptionsAnalysisTime] = useState<Options[]>([]);

  useEffect(() => {
    setAnalysisTime(analysis_times);
  }, [analysis_times]);

  useEffect(() => {
    const analysisTimeOptions = analysisTime.map((analysisTime) => ({
      label: analysisTime.name,
      value: analysisTime.code,
    }));
    setOptionsAnalysisTime(analysisTimeOptions);
  }, [analysisTime]);

  return {
    optionsAnalysisTime,
  };
};

import { useEffect, useState } from "react";
import { typedData } from "../global.d";
import { AccuracyLevel, Options } from "../models/api";

export const useAccuracyLevel = () => {
  const { accuracy_levels } = typedData;
  const [accuracyLevels, setAccuracyLevels] = useState<AccuracyLevel[]>([]);
  const [optionsAccuracyLevels, setOptionsAccuracyLevels] = useState<Options[]>(
    [],
  );

  useEffect(() => {
    setAccuracyLevels(accuracy_levels);
  }, [accuracy_levels]);

  useEffect(() => {
    const accuracyLevelOptions = accuracyLevels.map((accuracyLevel) => ({
      label: accuracyLevel.name,
      value: accuracyLevel.code,
    }));
    setOptionsAccuracyLevels(accuracyLevelOptions);
  }, [accuracyLevels]);

  return {
    optionsAccuracyLevels,
  };
};

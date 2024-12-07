import { useEffect, useState } from "react";
import { DatasetOrigin, Options } from "../models/api";
import { typedData } from "../global.d";

export const useDatasetOrigin = () => {
  const { dataset_origin } = typedData;
  const [datasetsOrigin, setDatasetsOrigin] = useState<DatasetOrigin[]>([]);
  const [optionsDatasetOrigin, setOptionsDatasetOrigin] = useState<Options[]>(
    [],
  );

  useEffect(() => {
    setDatasetsOrigin(dataset_origin);
  }, [dataset_origin]);

  useEffect(() => {
    const datasetOriginOptions = datasetsOrigin.map((datasetOrigin) => ({
      label: datasetOrigin.name,
      value: datasetOrigin.code,
      disabled: datasetOrigin.disabled,
    }));
    setOptionsDatasetOrigin(datasetOriginOptions);
  }, [datasetsOrigin]);

  return {
    optionsDatasetOrigin,
  };
};

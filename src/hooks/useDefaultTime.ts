import { useEffect, useState } from "react";
import { typedData } from "../global.d";
import { DefaultTime, Options } from "../models/api";

export const useDefaultTime = () => {
  const { default_times } = typedData;
  const [defaultTime, setDefaultTime] = useState<DefaultTime[]>([]);
  const [optionsDefaultTime, setOptionsDefaultTime] = useState<Options[]>([]);

  useEffect(() => {
    setDefaultTime(default_times);
  }, [default_times]);

  useEffect(() => {
    const defaultTimeOptions = defaultTime.map((defaultTime) => ({
      label: defaultTime.name,
      value: defaultTime.code,
    }));
    setOptionsDefaultTime(defaultTimeOptions);
  }, [defaultTime]);

  return {
    optionsDefaultTime,
  };
};

import { useEffect, useState } from "react";
import { typedData } from "../global.d";
import { Options } from "../models/api";

export const useNfType = () => {
  const { nf_types } = typedData;
  const [nfTypes, setNfTypes] = useState<string[]>([]);
  const [optionsNfTypes, setOptionsNfTypes] = useState<Options[]>([]);

  useEffect(() => {
    setNfTypes(nf_types);
  }, [nf_types]);

  useEffect(() => {
    const nfTypesOptions = nfTypes.map((nfType) => ({
      label: nfType,
      value: nfType,
    }));
    setOptionsNfTypes(nfTypesOptions);
  }, [nfTypes]);

  return {
    optionsNfTypes,
  };
};

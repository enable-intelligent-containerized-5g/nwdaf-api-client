import { useEffect, useState } from "react";
import { Options, TypeInfoFilter } from "../models/api";
import { typedData } from "../global.d";

export const useTypeInfoFilter = () => {
  const { type_info_filters } = typedData;
  const [typeInfoFilters, setTypeInfoFilters] = useState<TypeInfoFilter[]>([]);
  const [optionsTypeInfoFilters, setOptionsTypeInfoFilters] = useState<
    Options[]
  >([]);

  useEffect(() => {
    setTypeInfoFilters(type_info_filters);
  }, [type_info_filters]);

  useEffect(() => {
    const typeInfoFiltersOptions = typeInfoFilters.map((typeInfoFilter) => ({
      label: typeInfoFilter.name,
      value: typeInfoFilter.code,
    }));
    setOptionsTypeInfoFilters(typeInfoFiltersOptions);
  }, [typeInfoFilters]);

  return {
    optionsTypeInfoFilters,
  };
};

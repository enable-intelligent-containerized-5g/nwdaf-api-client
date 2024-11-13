import { useEffect, useState } from "react";
import { Options, TypeInfoFilter } from "../models/api";
import data from "../data.json";

const { type_info_filters } = data;

export const useTypeInfoFilter = () => {
  const [typeInfoFilters, setTypeInfoFilters] = useState<TypeInfoFilter[]>([]);
  const [options, setOptions] = useState<Options[]>([]);

  useEffect(() => {
    setTypeInfoFilters(type_info_filters);
    load();
  }, [type_info_filters]);

  const load = () => {
    const typeInfoFiltersOptions = typeInfoFilters.map((typeInfoFilter) => ({
      label: typeInfoFilter.name,
      value: typeInfoFilter.code,
    }));
    setOptions(typeInfoFiltersOptions);
  };

  return {
    options,
  };
};

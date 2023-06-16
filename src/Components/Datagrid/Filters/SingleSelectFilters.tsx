import { Select } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { TValueOptions } from "../datagrid.interface";

type Props = {
  options: TValueOptions[] | string[];
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
};

export function SingleSelectFilters({ setFilterValue, options }: Props) {
  const [selectState, setSelectState] = useState("");

  const selectOptions = useMemo(
    () =>
      options.map((opt) => {
        if (typeof opt === "string") {
          return opt;
        }
        return opt.label;
      }),
    [options],
  );

  useEffect(() => {
    if (selectState === "") return;
    let mFilterValue: string = "";
    for (let i = 0; i < options.length; i += 1) {
      const opt = options[i];
      if (typeof opt === "string") {
        mFilterValue = selectState;
        break;
      }
      if (opt.label === selectState) {
        mFilterValue = opt.value.toString();
        break;
      }
    }
    if (mFilterValue === "") return;
    setFilterValue(mFilterValue);
  }, [selectState, options]);

  return (
    <Select
      data={selectOptions ?? []}
      label="Value"
      placeholder="Choose"
      searchable
      value={selectState}
      onChange={(val) => setSelectState(val ?? selectOptions[0])}
    />
  );
}

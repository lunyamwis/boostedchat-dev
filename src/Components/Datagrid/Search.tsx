import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";
import { Search } from "tabler-icons-react";

type Props = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<TextInputProps, "onChange">;

export function DataGridSearch({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: Props) {
  const [value, setValue] = React.useState<number | string>(initialValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextInput
      {...props}
      value={value}
      onChange={handleInputChange}
      icon={<Search size={16} />}
    />
  );
}

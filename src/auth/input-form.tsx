import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

export type FormProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  name: string;
  type: string;
};

const Input = ({ onChange, value, label, name, type }: FormProps) => {
  return (
    <TextField
      value={value}
      autoFocus
      required
      id={name}
      name={name}
      label={label}
      type={type}
      fullWidth
      variant="standard"
      onChange={onChange}
    />
  );
};

export default Input;

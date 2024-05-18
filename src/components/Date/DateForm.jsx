import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

export default function DateForm(props) {
  const { name, control, reset } = props;

  useEffect(() => {
    control._resetDefaultValues();
  }, [reset]);

  return (
    <Controller
      reset={reset}
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          {...props}
          placeholderText="Select date"
          onChange={(date) => field.onChange(dateFormat(date))}
          selected={field.value}
          inputFormat="DD/MM/YYYY"
          format="DD/MM/YYYY"
          slotProps={{ field: { clearable: true } }}
        />
      )}
    />
  );
}

const dateFormat = (date) => {
  const d = date.$D.toString().length > 1 ? `${date.$D}` : `0${date.$D}`;
  const m = date.$M + 1;
  const y = date.$y;
  return `${d}/${m}/${y}`;
};

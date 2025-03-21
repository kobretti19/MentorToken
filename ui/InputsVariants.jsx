/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "@material-tailwind/react";

export function InputsVariants({
  label,
  value,
  placeholder,
  required,
  ...props
}) {
  const [isTouched, setIsTouched] = useState(false);

  console.log(value);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const inputClass =
    isTouched && !value ? "border-red-500 bg-red-50" : "border-indigo-500";

  return (
    <div className="flex w-full flex-col gap-6 text-xs">
      <Input
        color="indigo"
        variant="outlined"
        label={label}
        placeholder={placeholder}
        value={value}
        onBlur={handleBlur}
        required={required}
        className={`${inputClass} focus:outline-none`}
        {...props}
      />
    </div>
  );
}

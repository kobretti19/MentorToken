/* eslint-disable react/prop-types */
import { Input } from "@material-tailwind/react";

export function InputsVariants({ label, placeholder, ...props }) {
  return (
    <div className="flex w-full flex-col gap-6 text-xs">
      <Input
        color="indigo"
        variant="outlined"
        label={label}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

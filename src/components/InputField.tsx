import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <div className="mb-2">
      <label className="text-slate-500 mb-2 block text-sm">{props.label}</label>
      <input
        type={props.type}
        {...props.register}
        className="p-3 rounded block bg-slate-900 text-slate-300 w-full"
        placeholder={props.placeholder}
      />
      {props.error && (
        <span className="text-red-500 text-xs">{props.error.message}</span>
      )}
    </div>
  );
};

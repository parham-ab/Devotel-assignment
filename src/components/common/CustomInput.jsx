import { useController } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  label,
  hasIcon = false,
  icon,
  className,
  placeholder,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <div className="py-1">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="relative">
        {hasIcon && (
          <div className="absolute text-[18px] text-gray-200 right-[6px] top-[62%] translate-y-[-50%]">
            {icon}
          </div>
        )}
        <input
          type={"text"}
          id={name}
          placeholder={placeholder}
          {...field}
          className={className}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
};

export default CustomInput;

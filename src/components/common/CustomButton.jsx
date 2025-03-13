const CustomButton = ({
  onClick = () => {},
  children,
  type,
  className,
  style = {},
  disabled,
}) => {
  return (
    <div>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={className}
        style={style}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;

import React from "react";

const CustomButton = ({
  onClick = () => {},
  children,
  type,
  className,
  style = {},
}) => {
  return (
    <div>
      <button type={type} onClick={onClick} className={className} style={style}>
        {children}
      </button>
    </div>
  );
};

export default CustomButton;

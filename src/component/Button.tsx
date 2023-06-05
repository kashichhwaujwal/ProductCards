import React from "react";

interface Props {
  className: string;
  label: string;
  onClick?: React.MouseEventHandler;
}

const Button = ({ className, label, onClick }: Props) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

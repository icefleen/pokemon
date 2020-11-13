import React, { FC } from "react";
import classnames from "classnames";
import s from "./Button.module.scss";

type PropsType = {
  className?: string;
  variant?: "primary";
  disabled?: boolean;
  onClick?: () => void;
};

const Button: FC<PropsType> = ({
  className,
  variant,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={classnames(className, s.button, {
        [s.button_primary]: variant === "primary",
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
